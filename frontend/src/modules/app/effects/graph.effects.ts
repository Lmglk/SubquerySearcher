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
import { UploadGraphAction } from '../actions/UploadGraphAction';
import { SetGraphAction } from '../actions/SetGraphAction';
import { CalculateGraphAction } from '../actions/CalculateGraphAction';
import { getOriginalGraph } from '../selectors/getOriginalGraph';
import { getPartitionList } from '../selectors/getPartitionList';
import { LoadScheduleAction } from '../actions/LoadScheduleAction';
import { FileService } from '../services/file.service';
import { SuccessfulGraphUploadAction } from '../actions/SuccessfulGraphUploadAction';
import { ErrorNotificationAction } from '../actions/ErrorNotificationAction';
import { getOptimizationMode } from '../selectors/getOptimizationMode';
import { SetOptimizationModeAction } from '../actions/SetOptimizationModeAction';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { NodePartitionService } from '../services/node-partition.service';
import { IRootState } from '../interfaces/IRootState';

@Injectable()
export class GraphEffects {
    @Effect()
    public uploadGraph$ = this.actions$.pipe(
        ofType<UploadGraphAction>(UploadGraphAction.type),
        switchMap(action => {
            return this.fileService.parseFileToGraph(action.payload).pipe(
                mergeMap(graph => [
                    new SuccessfulGraphUploadAction(graph),
                    new LoadScheduleAction(graph),
                ]),
                catchError(error =>
                    of(new ErrorNotificationAction(error.message))
                )
            );
        })
    );

    @Effect()
    public calculateGraph$ = this.actions$.pipe(
        ofType<CalculateGraphAction | SetOptimizationModeAction>(
            CalculateGraphAction.type,
            SetOptimizationModeAction.type
        ),
        withLatestFrom(this.store.select(getOriginalGraph)),
        map(([action, originalGraph]) => {
            return new LoadScheduleAction(originalGraph);
        })
    );

    @Effect()
    public loadSchedule$ = this.actions$.pipe(
        ofType<LoadScheduleAction>(LoadScheduleAction.type),
        withLatestFrom(
            this.store.select(getOptimizationMode),
            this.store.select(getPartitionList)
        ),
        switchMap(([action, optimizationMode, partitionList]) => {
            const graph = this.nodePartitionService.nodePartition(
                action.graph,
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
        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<IRootState>,
        private readonly fileService: FileService,
        private readonly apiGraphService: ApiGraphService,
        private readonly nodePartitionService: NodePartitionService
    ) {}
}
