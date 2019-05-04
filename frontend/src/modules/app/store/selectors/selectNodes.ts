import { createSelector } from '@ngrx/store';
import { selectGraph } from './selectInitialGraph';

export const selectNodes = createSelector(
    selectGraph,
    graph => graph && graph.nodes
);
