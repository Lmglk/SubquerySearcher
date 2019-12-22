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
import { AppState } from '../interfaces/AppState';
import { UploadGraphAction } from '../actions/UploadGraphAction';
import { ResetScheduleAction } from '../actions/ResetScheduleAction';
import { SetNodesListAction } from '../actions/SetNodesListAction';
import { SetGraphAction } from '../actions/SetGraphAction';
import { CalculateGraphAction } from '../actions/CalculateGraphAction';
import { selectOriginalGraph } from '../selectors/selectOriginalGraph';
import { selectSeparateNodes } from '../selectors/selectSeparateNodes';
import { LoadScheduleAction } from '../actions/LoadScheduleAction';
import { FileService } from '../services/file.service';
import { SuccessfulGraphUploadAction } from '../actions/SuccessfulGraphUploadAction';
import { ErrorNotificationAction } from '../actions/ErrorNotificationAction';
import { getOptimizationMode } from '../selectors/getOptimizationMode';
import { SetActiveTabAction } from '../actions/SetActiveTabAction';
import { SetOptimizationModeAction } from '../actions/SetOptimizationModeAction';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { NodePartitionService } from '../services/node-partition.service';

@Injectable()
export class GraphEffects {
    @Effect()
    public uploadGraph$ = this.actions$.pipe(
        ofType<UploadGraphAction>(UploadGraphAction.type),
        switchMap(action => {
            return this.fileService.parseFileToGraph(action.payload).pipe(
                mergeMap(graph => [
                    new ResetScheduleAction(),
                    new SuccessfulGraphUploadAction(graph),
                    new SetNodesListAction(graph.nodes),
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
        ofType<CalculateGraphAction>(CalculateGraphAction.type),
        withLatestFrom(
            this.store.select(selectOriginalGraph),
            this.store.select(selectSeparateNodes)
        ),
        mergeMap(([action, originalGraph, partitionList]) => {
            const graph = this.nodePartitionService.nodePartition(
                originalGraph,
                partitionList
            );

            return [new LoadScheduleAction(graph), new SetGraphAction(graph)];
        })
    );

    @Effect()
    public setActiveTab$ = this.actions$.pipe(
        ofType<SetActiveTabAction>(SetActiveTabAction.type),
        mergeMap(action => [
            new SetOptimizationModeAction(action.mode),
            new CalculateGraphAction(),
        ])
    );

    @Effect()
    public loadSchedule$ = this.actions$.pipe(
        ofType<LoadScheduleAction>(LoadScheduleAction.type),
        withLatestFrom(this.store.select(getOptimizationMode)),
        switchMap(([action, optimizationMode]) =>
            this.apiGraphService
                .getSchedule(action.graph, optimizationMode)
                .pipe(
                    map(schedule => new SetScheduleAction(schedule)),
                    catchError(() =>
                        of(
                            new ErrorNotificationAction(
                                'Optimize schedule is failed'
                            )
                        )
                    )
                )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly fileService: FileService,
        private readonly apiGraphService: ApiGraphService,
        private readonly nodePartitionService: NodePartitionService
    ) {}
}
