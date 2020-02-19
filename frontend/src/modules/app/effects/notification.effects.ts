import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { SuccessNotificationAction } from '../actions/SuccessNotificationAction';
import { map } from 'rxjs/operators';
import { ErrorNotificationAction } from '../actions/ErrorNotificationAction';

@Injectable()
export class NotificationEffects {
    public successNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<SuccessNotificationAction>(
                    SuccessNotificationAction.type
                ),
                map(action => this.toastr.success(action.message))
            ),
        { dispatch: false }
    );

    public errorNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<ErrorNotificationAction>(ErrorNotificationAction.type),
                map(action => this.toastr.error(action.message))
            ),
        { dispatch: false }
    );

    constructor(
        private readonly actions$: Actions,
        private readonly toastr: ToastrService
    ) {}
}
