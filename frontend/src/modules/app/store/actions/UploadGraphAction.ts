import { Action } from '@ngrx/store';

export class UploadGraphAction implements Action {
    public static readonly type = '[Graph] Upload graph';

    readonly type = UploadGraphAction.type;

    constructor(readonly payload: File) {}
}
