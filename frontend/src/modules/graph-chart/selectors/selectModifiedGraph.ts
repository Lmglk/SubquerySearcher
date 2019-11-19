import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/interfaces/AppState';

export const selectModifiedGraph = createSelector(
    (state: AppState) => state.graphState,
    state => state.graph
);
