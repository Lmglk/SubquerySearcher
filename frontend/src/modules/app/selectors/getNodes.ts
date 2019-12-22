import { createSelector } from '@ngrx/store';
import { getGraph } from '../../graph-chart/selectors/getGraph';

export const getNodes = createSelector(
    getGraph,
    graph => graph.nodes
);
