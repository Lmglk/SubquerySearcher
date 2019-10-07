import { Action } from 'redux';
import { Graph } from '../../GraphChartLayout/types/Graph';

export class SetGraphAction implements Action {
    public static readonly type = 'Set graph';

    public readonly type = SetGraphAction.type;

    constructor(public readonly payload: Graph) {}
}
