import { Action } from '@ngrx/store';

export class ResetModifiedGraphAction implements Action {
    public static readonly type = '[Graph] Reset modified graph';

    readonly type = ResetModifiedGraphAction.type;
}
