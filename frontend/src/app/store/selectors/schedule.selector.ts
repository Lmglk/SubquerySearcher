import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectMetrics = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.metrics
);

export const selectGroups = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.groups
);

export const selectMaxGroupSize = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.metrics && state.metrics.width
);
