import { Action } from '@ngrx/store';

export class ErrorNotificationAction implements Action {
    public static readonly type = '[Notification] Show error notification';

    public readonly type = ErrorNotificationAction.type;

    constructor(public readonly message: string) {}
}
