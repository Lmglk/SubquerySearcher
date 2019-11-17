import { Action } from '@ngrx/store';

export class RejectOptimizeScheduleAction implements Action {
    public static readonly type = '[Schedule] Reject optimization';

    readonly type = RejectOptimizeScheduleAction.type;
}
