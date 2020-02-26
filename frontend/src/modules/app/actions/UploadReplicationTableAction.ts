import { Action } from '@ngrx/store';

export class UploadReplicationTableAction implements Action {
    public static readonly type = '[Replication] Upload replication table';

    public readonly type = UploadReplicationTableAction.type;

    constructor(readonly file: File) {}
}
