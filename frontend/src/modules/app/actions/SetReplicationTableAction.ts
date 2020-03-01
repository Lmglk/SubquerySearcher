import { Action } from '@ngrx/store';
import { IReplicationItem } from '../interfaces/IReplicationItem';

export class SetReplicationTableAction implements Action {
    public static readonly type = '[Replication] Set replication table';

    public readonly type = SetReplicationTableAction.type;

    constructor(public readonly replicationTable: IReplicationItem[]) {}
}
