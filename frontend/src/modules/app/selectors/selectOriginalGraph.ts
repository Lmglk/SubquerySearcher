import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const selectOriginalGraph = createSelector(
    getAppState,
    state => state.originalGraph
);
