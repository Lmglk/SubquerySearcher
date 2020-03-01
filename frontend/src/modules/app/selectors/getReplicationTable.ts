import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const getReplicationTable = createSelector(
    getAppState,
    state => state.replicationTable
);
