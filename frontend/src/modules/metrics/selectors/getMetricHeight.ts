import { createSelector } from '@ngrx/store';
import { getSchedule } from '../../app/selectors/getSchedule';

export const getMetricHeight = createSelector(
    getSchedule,
    groups => groups.length
);
