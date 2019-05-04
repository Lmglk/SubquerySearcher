import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectGroups = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.groups
);
