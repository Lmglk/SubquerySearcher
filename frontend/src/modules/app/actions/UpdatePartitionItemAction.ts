import { Action } from '@ngrx/store';
import { PartitionItem } from '../interfaces/PartitionItem';

export class UpdatePartitionItemAction implements Action {
    public static readonly type = '[Partition] Update partition item';

    readonly type = UpdatePartitionItemAction.type;

    constructor(readonly payload: PartitionItem) {}
}
