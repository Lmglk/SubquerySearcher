import { createSelector } from '@ngrx/store';
import { AppState } from '../interfaces/AppState';

export const selectMaxGroupSize = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.metrics && state.metrics.width
);
