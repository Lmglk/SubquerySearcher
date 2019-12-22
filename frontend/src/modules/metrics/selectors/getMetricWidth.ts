import { createSelector } from '@ngrx/store';
import { getSchedule } from '../../app/selectors/getSchedule';

export const getMetricWidth = createSelector(
    getSchedule,
    groups =>
        groups.length
            ? Math.max(...groups.map(group => group.sequences.length))
            : 0
);
