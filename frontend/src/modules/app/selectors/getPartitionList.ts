import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const getPartitionList = createSelector(
    getAppState,
    state => state.separateNodes
);
