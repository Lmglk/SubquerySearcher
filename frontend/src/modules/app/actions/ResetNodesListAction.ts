import { Action } from '@ngrx/store';

export class ResetNodesListAction implements Action {
    public static readonly type = '[Separate nodes] Reset';

    readonly type = ResetNodesListAction.type;
}
