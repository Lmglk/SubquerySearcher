import { Action } from '@ngrx/store';
import { PartitionItem } from '../interfaces/PartitionItem';

export class UpdateNodeAction implements Action {
    public static readonly type = '[Separate nodes] Update';

    readonly type = UpdateNodeAction.type;

    constructor(readonly payload: PartitionItem) {}
}
