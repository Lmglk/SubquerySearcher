import { Action } from '@ngrx/store';

export class SuccessNotificationAction implements Action {
    public static readonly type = '[Notification] Show success notification';

    public readonly type = SuccessNotificationAction.type;

    constructor(public readonly message: string) {}
}
