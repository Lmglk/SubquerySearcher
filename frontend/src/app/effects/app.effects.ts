import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    ActionTypes,
    RejectUploadGraphAction,
    SetInitialGraphAction,
    SetModifiedGraphAction,
    UploadGraphAction,
} from '../store/actions/graph.actions';
import { catchError, mergeMap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { ResetScheduleAction } from '../store/actions/schedule.actions';
import { SetNodesListAction } from '../store/actions/separate-nodes.action';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
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

    constructor(
        private readonly actions$: Actions,
        private readonly httpService: HttpService,
        private readonly toastr: ToastrService
    ) {}
}
