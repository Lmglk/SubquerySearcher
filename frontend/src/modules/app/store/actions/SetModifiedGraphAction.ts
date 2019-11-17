import { Action } from '@ngrx/store';
import { Graph } from '../../interfaces/Graph';

export class SetModifiedGraphAction implements Action {
    public static readonly type = '[Graph] Set modified graph';
    readonly type = SetModifiedGraphAction.type;

    constructor(readonly payload: Graph) {}
}
