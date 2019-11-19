import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { SuccessNotificationAction } from '../actions/SuccessNotificationAction';
import { map } from 'rxjs/operators';
import { ErrorNotificationAction } from '../actions/ErrorNotificationAction';

@Injectable()
export class NotificationEffects {
    @Effect({ dispatch: false })
    public successNotification = this.actions$.pipe(
        ofType<SuccessNotificationAction>(SuccessNotificationAction.type),
        map(action => this.toastr.success(action.message))
    );

    @Effect({ dispatch: false })
    public errorNotification = this.actions$.pipe(
        ofType<ErrorNotificationAction>(ErrorNotificationAction.type),
        map(action => this.toastr.error(action.message))
    );

    constructor(
        private readonly actions$: Actions,
        private readonly toastr: ToastrService
    ) {}
}
