import { createSelector } from '@ngrx/store';
import { getAppState } from './getAppState';

export const getSchedule = createSelector(
    getAppState,
    state => state.schedule
);
