import { createSelector } from '@ngrx/store';
import { selectGraph } from '../../graph-chart/selectors/selectGraph';

export const getNumberOfGraphNodes = createSelector(
    selectGraph,
    graph => graph.nodes.length
);
