import { Action } from '@ngrx/store';
import { Graph } from '../interfaces/Graph';

export class SetOriginalGraphAction implements Action {
    public static readonly type = '[Graph] Upload graph successful';

    public readonly type = SetOriginalGraphAction.type;

    constructor(public readonly graph: Graph) {}
}
