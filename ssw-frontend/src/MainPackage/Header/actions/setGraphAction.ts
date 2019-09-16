import { GraphData } from '../../../ChartPackage/GraphChart';
import { Action } from 'redux';

export const setGraphAction = (graph: GraphData) => ({
    type: 'Set graph',
    payload: graph,
});

export class SetGraphAction implements Action {
    public static readonly type = 'Set graph';

    public readonly type = SetGraphAction.type;

    constructor(public readonly payload: GraphData) {}
}
