import { createSelector } from '@ngrx/store';
import { selectGraph } from '../../app/selectors/selectInitialGraph';

export const selectNodes = createSelector(
    selectGraph,
    graph => graph && graph.nodes
);
