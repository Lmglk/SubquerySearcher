import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/interfaces/AppState';

export const selectMetrics = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.metrics
);
