import { createSelector } from '@ngrx/store';
import { getOriginalGraph } from './getOriginalGraph';

export const getOriginalGraphNodes = createSelector(
    getOriginalGraph,
    graph => graph.nodes
);
