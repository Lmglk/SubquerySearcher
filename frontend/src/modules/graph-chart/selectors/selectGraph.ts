import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/interfaces/AppState';

export const selectGraph = createSelector(
    (state: AppState) => state.graphState,
    state => state.graph
);
