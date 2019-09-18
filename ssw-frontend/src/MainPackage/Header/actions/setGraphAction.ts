import { Action } from 'redux';
import { Graph } from '../../GraphChartLayout/types/Graph';

export const setGraphAction = (graph: Graph) => ({
    type: 'Set graph',
    payload: graph,
});

export class SetGraphAction implements Action {
    public static readonly type = 'Set graph';

    public readonly type = SetGraphAction.type;

    constructor(public readonly payload: Graph) {}
}
