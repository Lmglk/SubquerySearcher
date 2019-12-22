import { createSelector } from '@ngrx/store';
import { getAppState } from '../../app/selectors/getAppState';

export const selectGraph = createSelector(
    getAppState,
    state => state.graph
);
