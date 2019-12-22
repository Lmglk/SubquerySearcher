import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const getOriginalGraph = createSelector(
    getAppState,
    state => state.originalGraph
);
