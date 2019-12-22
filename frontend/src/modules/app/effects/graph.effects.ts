import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    catchError,
    map,
    mergeMap,
    switchMap,
    withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApiGraphService } from '../services/api-graph.service';
import { UploadOriginalGraphAction } from '../actions/UploadOriginalGraphAction';
import { SetGraphAction } from '../actions/SetGraphAction';
import { getOriginalGraph } from '../selectors/getOriginalGraph';
import { getPartitionList } from '../selectors/getPartitionList';
import { LoadScheduleAction } from '../actions/LoadScheduleAction';
import { FileService } from '../services/file.service';
import { SetOriginalGraphAction } from '../actions/SetOriginalGraphAction';
import { ErrorNotificationAction } from '../actions/ErrorNotificationAction';
import { getOptimizationMode } from '../selectors/getOptimizationMode';
import { SetOptimizationModeAction } from '../actions/SetOptimizationModeAction';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { NodePartitionService } from '../services/node-partition.service';
import { IRootState } from '../interfaces/IRootState';
import { UpdatePartitionItemAction } from '../actions/UpdatePartitionItemAction';

@Injectable()
export class GraphEffects {
    @Effect()
    public uploadGraph$ = this.actions$.pipe(
        ofType<UploadOriginalGraphAction>(UploadOriginalGraphAction.type),
        switchMap(action =>
            this.fileService.parseFileToGraph(action.payload).pipe(
                map(graph => new SetOriginalGraphAction(graph)),
                catchError(error =>
                    of(new ErrorNotificationAction(error.message))
                )
            )
        )
    );

    @Effect()
    public loadSchedule$ = this.actions$.pipe(
        ofType(
            LoadScheduleAction.type,
            SetOriginalGraphAction.type,
            SetOptimizationModeAction.type,
            UpdatePartitionItemAction.type
        ),
        withLatestFrom(
            this.store.select(getOriginalGraph),
            this.store.select(getOptimizationMode),
            this.store.select(getPartitionList)
        ),
        switchMap(
            ([action, originalGraph, optimizationMode, partitionList]) => {
                const graph = this.nodePartitionService.nodePartition(
                    originalGraph,
                    partitionList
                );

                return this.apiGraphService
                    .getSchedule(graph, optimizationMode)
                    .pipe(
                        mergeMap(schedule => [
                            new SetGraphAction(graph),
                            new SetScheduleAction(schedule),
                        ]),
                        catchError(() =>
                            of(
                                new ErrorNotificationAction(
                                    'Optimize schedule is failed'
                                )
                            )
                        )
                    );
            }
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<IRootState>,
        private readonly fileService: FileService,
        private readonly apiGraphService: ApiGraphService,
        private readonly nodePartitionService: NodePartitionService
    ) {}
}
