import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/AppState';

export const selectGraph = createSelector(
    (state: AppState) => state.graphState,
    state => state.initialGraph
);
