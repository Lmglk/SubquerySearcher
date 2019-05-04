import { Action } from '@ngrx/store';

export class ResetGroupsAction implements Action {
    public static readonly type = '[Schedule] Reset groups';

    readonly type = ResetGroupsAction.type;
}
