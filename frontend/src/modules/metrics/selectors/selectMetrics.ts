import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/types/AppState';

export const selectMetrics = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.metrics
);
