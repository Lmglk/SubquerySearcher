import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/AppState';

export const selectOriginalGraph = createSelector(
    (state: AppState) => state.graphState,
    state => state.originalGraph
);