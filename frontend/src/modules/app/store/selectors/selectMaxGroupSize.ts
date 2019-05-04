import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectMaxGroupSize = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.metrics && state.metrics.width
);
