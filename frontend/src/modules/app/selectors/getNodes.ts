import { createSelector } from '@ngrx/store';
import { selectGraph } from '../../graph-chart/selectors/selectGraph';

export const getNodes = createSelector(
    selectGraph,
    graph => graph.nodes
);
