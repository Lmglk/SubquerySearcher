import { createSelector } from '@ngrx/store';
import { getSchedule } from '../../app/selectors/getSchedule';

export const getMetricTime = createSelector(
    getSchedule,
    groups => {
        return groups.length
            ? groups
                  .map(group => group.time)
                  .reduce((acc, curr) => acc + curr, 0)
            : 0;
    }
);
