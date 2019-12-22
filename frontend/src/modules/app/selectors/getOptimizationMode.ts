import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const getOptimizationMode = createSelector(
    getAppState,
    state => state.optimizationMode
);
