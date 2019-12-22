import { Action } from '@ngrx/store';
import { Graph } from '../interfaces/Graph';

export class LoadScheduleAction implements Action {
    public static readonly type = '[Schedule] Load';

    readonly type = LoadScheduleAction.type;

    constructor(public readonly graph: Graph) {}
}
