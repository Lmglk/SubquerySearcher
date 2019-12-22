import { createSelector } from '@ngrx/store';
import { getAppState } from '../../app/selectors/getAppState';

export const getGraph = createSelector(
    getAppState,
    state => state.graph
);
