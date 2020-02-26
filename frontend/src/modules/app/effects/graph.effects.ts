import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    catchError,
    map,
    mergeMap,
    switchMap,
    withLatestFrom,
} from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
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
import { UploadReplicationTableAction } from '../actions/UploadReplicationTableAction';
import { SetReplicationTableAction } from '../actions/SetReplicationTableAction';
import { getOriginalGraphNodes } from '../selectors/getOriginalGraphNodes';
import { Graph } from '../interfaces/Graph';
import { GraphNode } from '../interfaces/GraphNode';

@Injectable()
export class GraphEffects {
    public uploadGraph$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UploadOriginalGraphAction>(UploadOriginalGraphAction.type),
            switchMap(action =>
                this.fileService.parseFile(
                    action.payload,
                    this.fileService.parseGraph
                )
            ),
            map((graph: Graph) => new SetOriginalGraphAction(graph)),
            catchError(error => of(new ErrorNotificationAction(error.message)))
        )
    );

    public uploadReplicationTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UploadReplicationTableAction>(
                UploadReplicationTableAction.type
            ),
            withLatestFrom(this.store.pipe(select(getOriginalGraphNodes))),
            switchMap(([action, nodes]) => {
                const replicationTable$ = this.fileService.parseFile(
                    action.file,
                    this.fileService.parseReplicationTable
                );

                return combineLatest(replicationTable$, of(nodes));
            }),
            map(([data, nodes]: [Array<[string, number]>, GraphNode[]]) => {
                const replicationItem = data.map(touple => {
                    const node = nodes.find(item => item.name === touple[0]);

                    if (node === undefined) {
                        throw new Error(
                            'A node from the replication table does not exist'
                        );
                    }

                    return {
                        nodeId: node.id,
                        location: touple[1],
                    };
                });

                return new SetReplicationTableAction(replicationItem);
            }),
            catchError(error => of(new ErrorNotificationAction(error.message)))
        )
    );

    public loadSchedule$ = createEffect(() =>
        this.actions$.pipe(
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

                    const schedule$ = this.apiGraphService.getSchedule(
                        graph,
                        optimizationMode
                    );

                    return combineLatest(schedule$, of(graph));
                }
            ),
            mergeMap(([schedule, graph]) => [
                new SetGraphAction(graph),
                new SetScheduleAction(schedule),
            ]),
            catchError(() =>
                of(new ErrorNotificationAction('Optimize schedule is failed'))
            )
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
