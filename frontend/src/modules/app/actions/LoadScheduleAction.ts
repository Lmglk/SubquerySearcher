import { Action } from '@ngrx/store';
import { Graph } from '../interfaces/Graph';

export class LoadScheduleAction implements Action {
    public static readonly type = '[Graph] Load schedule';

    readonly type = LoadScheduleAction.type;

    constructor(public readonly graph: Graph) {}
}
