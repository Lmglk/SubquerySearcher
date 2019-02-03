import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    ActionTypes,
    CalculateGraphAction,
    RejectUploadGraphAction,
    SetInitialGraphAction,
    SetModifiedGraphAction,
    UploadGraphAction,
} from '../store/actions/graph.actions';
import { catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import {
    LoadScheduleAction,
    RejectOptimizeSchedule,
    ResetScheduleAction,
} from '../store/actions/schedule.actions';
import { SetNodesListAction } from '../store/actions/separate-nodes.action';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { selectGraph } from '../store/selectors/graph.selector';
import { selectSeparateNodes } from '../store/selectors/separate-nodes.selector';
import { Graph } from '../types/Graph';
import { InfoSeparate } from '../types/InfoSeparate';
import { Store } from '@ngrx/store';
import { AppState } from '../types/AppState';

@Injectable()
export class GraphEffects {
    @Effect()
    public uploadGraph$ = this.actions$.pipe(
        ofType(ActionTypes.UploadGraphAction),
        mergeMap((action: UploadGraphAction) =>
            this.httpService.uploadFile(action.payload).pipe(
                mergeMap(graph => [
                    new ResetScheduleAction(),
                    new SetInitialGraphAction(graph),
                    new SetNodesListAction(graph.nodes),
                    new SetModifiedGraphAction(graph),
                ]),
                catchError(() => {
                    this.toastr.error('Uploading file is failed');
                    return of(new RejectUploadGraphAction());
                })
            )
        )
    );

    @Effect()
    public calculateGraph$ = this.actions$.pipe(
        ofType(ActionTypes.CalculateGraphAction),
        withLatestFrom(
            this.store.select(selectGraph),
            this.store.select(selectSeparateNodes)
        ),
        mergeMap(
            ([action, graph, separateNodes]: [
                CalculateGraphAction,
                Graph,
                InfoSeparate[]
            ]) => {
                return this.httpService
                    .separateNodes(graph, separateNodes)
                    .pipe(
                        mergeMap(modifiedGraph => [
                            new LoadScheduleAction({
                                graph: modifiedGraph,
                                option: action.payload,
                            }),
                            new SetModifiedGraphAction(modifiedGraph),
                        ]),
                        catchError(() => {
                            this.toastr.error('Node splitting failed');
                            return of(new RejectOptimizeSchedule());
                        })
                    );
            }
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly httpService: HttpService,
        private readonly toastr: ToastrService
    ) {}
}
