import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/AppState';

export const getOptimizationMode = createSelector(
    (state: AppState) => state.commonState,
    state => state.optimizationMode
);
