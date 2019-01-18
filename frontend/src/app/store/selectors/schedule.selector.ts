import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectStatistic = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.statistics
);

export const selectGroups = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.groups
);

export const selectMaxGroupSize = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.statistics && state.statistics.width
);