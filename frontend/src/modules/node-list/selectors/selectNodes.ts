import { createSelector } from '@ngrx/store';
import { selectOriginalGraph } from '../../app/selectors/selectOriginalGraph';

export const selectNodes = createSelector(
    selectOriginalGraph,
    graph => graph && graph.nodes
);
