import { Action } from '@ngrx/store';

export class RejectLoadScheduleAction implements Action {
    public static readonly type = '[Schedule] Reject load';

    readonly type = RejectLoadScheduleAction.type;
}
