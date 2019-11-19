import { Action } from '@ngrx/store';
import { Graph } from '../interfaces/Graph';

export class SetGraphAction implements Action {
    public static readonly type = '[Graph] Set graph';
    readonly type = SetGraphAction.type;

    constructor(readonly payload: Graph) {}
}
