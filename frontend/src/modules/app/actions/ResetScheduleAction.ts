import { Action } from '@ngrx/store';

export class ResetScheduleAction implements Action {
    public static readonly type = '[Schedule] Reset';

    readonly type = ResetScheduleAction.type;
}
