import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/AppState';

export const selectGroups = createSelector(
    (state: AppState) => state.scheduleState,
    state => state.groups
);
