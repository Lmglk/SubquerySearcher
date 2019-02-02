import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectGraph = createSelector(
    (state: AppState) => state.graphState,
    state => state.initialGraph
);

export const selectNodes = createSelector(
    selectGraph,
    graph => graph && graph.nodes
);

export const selectModifiedGraph = createSelector(
    (state: AppState) => state.graphState,
    state => state.modifiedGraph
);
