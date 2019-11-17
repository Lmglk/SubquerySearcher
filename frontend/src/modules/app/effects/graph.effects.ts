import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UploadGraphAction } from '../store/actions/UploadGraphAction';
import { SetInitialGraphAction } from '../store/actions/SetInitialGraphActions';
import { SetModifiedGraphAction } from '../store/actions/SetModifiedGraphAction';
import { RejectUploadGraphAction } from '../store/actions/RejectUploadGraphAction';
import { CalculateGraphAction } from '../store/actions/CalculateGraphAction';
import { selectGraph } from '../store/selectors/selectInitialGraph';
import { selectSeparateNodes } from '../store/selectors/selectSeparateNodes';
import { ResetScheduleAction } from '../store/actions/ResetScheduleAction';
import { LoadScheduleAction } from '../store/actions/LoadScheduleAction';
import { RejectOptimizeScheduleAction } from '../store/actions/RejectOptimizeScheduleAction';
import { SetNodesListAction } from '../store/actions/SetNodesListAction';
import { ApiGraphService } from '../services/api-graph.service';
import { AppState } from '../interfaces/AppState';

@Injectable()
export class GraphEffects {
    @Effect()
    public uploadGraph$ = this.actions$.pipe(
        ofType<UploadGraphAction>(UploadGraphAction.type),
        mergeMap(action =>
            this.apiGraphService.uploadFile(action.payload).pipe(
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
        ofType<CalculateGraphAction>(CalculateGraphAction.type),
        withLatestFrom(
            this.store.select(selectGraph),
            this.store.select(selectSeparateNodes)
        ),
        mergeMap(([action, graph, separateNodes]) =>
            this.apiGraphService.separateNodes(graph, separateNodes).pipe(
                mergeMap(modifiedGraph => [
                    new LoadScheduleAction({
                        graph: modifiedGraph,
                        option: action.payload,
                    }),
                    new SetModifiedGraphAction(modifiedGraph),
                ]),
                catchError(() => {
                    this.toastr.error('Node splitting failed');
                    return of(new RejectOptimizeScheduleAction());
                })
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly apiGraphService: ApiGraphService,
        private readonly toastr: ToastrService
    ) {}
}
