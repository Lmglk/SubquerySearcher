import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectGraph = createSelector(
    (state: AppState) => state.graphState,
    state => state.graph
);

export const selectNodes = createSelector(
    selectGraph,
    graph => graph && graph.nodes
);
