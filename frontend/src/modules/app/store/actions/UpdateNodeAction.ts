import { Action } from '@ngrx/store';
import { InfoSeparate } from '../../types/InfoSeparate';

export class UpdateNodeAction implements Action {
    public static readonly type = '[Separate nodes] Update';

    readonly type = UpdateNodeAction.type;

    constructor(readonly payload: InfoSeparate) {}
}
