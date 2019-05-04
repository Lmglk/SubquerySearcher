import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectModifiedGraph = createSelector(
    (state: AppState) => state.modifiedGraphState,
    state => state.modifiedGraph
);
