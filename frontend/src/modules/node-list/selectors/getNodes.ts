import { createSelector } from '@ngrx/store';
import { getOriginalGraph } from '../../app/selectors/getOriginalGraph';

export const getNodes = createSelector(
    getOriginalGraph,
    graph => graph && graph.nodes
);
