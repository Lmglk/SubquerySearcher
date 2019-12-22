import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const selectGroups = createSelector(
    getAppState,
    state => state.groups
);
