import { Action } from '@ngrx/store';
import { Graph } from '../interfaces/Graph';

export class SetInitialGraphAction implements Action {
    public static readonly type = '[Graph] Set initial graph';

    readonly type = SetInitialGraphAction.type;

    constructor(readonly payload: Graph) {}
}
