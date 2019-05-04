import { Action } from '@ngrx/store';

export class RejectUploadGraphAction implements Action {
    public static readonly type = '[Graph] Reject upload graph';

    readonly type = RejectUploadGraphAction.type;
}
