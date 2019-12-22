import { Action } from '@ngrx/store';

export class UploadOriginalGraphAction implements Action {
    public static readonly type = '[Graph] Upload graph';

    readonly type = UploadOriginalGraphAction.type;

    constructor(readonly payload: File) {}
}
