import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const selectSeparateNodes = createSelector(
    getAppState,
    state => state.separateNodes
);
