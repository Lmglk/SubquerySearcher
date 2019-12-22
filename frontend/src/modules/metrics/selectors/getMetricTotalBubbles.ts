import { createSelector } from '@ngrx/store';
import { getMetricWidth } from './getMetricWidth';
import { getSchedule } from '../../app/selectors/getSchedule';

export const getMetricTotalBubbles = createSelector(
    getSchedule,
    getMetricWidth,
    (groups, width) => {
        if (groups.length === 0) {
            return 0;
        }

        const bubbles = groups.map(group => width - group.sequences.length);

        return bubbles.reduce((acc, curr) => acc + curr, 0);
    }
);
