import { createSelector } from '@ngrx/store';
import { getMetricWidth } from './getMetricWidth';
import { selectGroups } from '../../app/selectors/selectGroups';

export const getMetricTotalBubbles = createSelector(
    selectGroups,
    getMetricWidth,
    (groups, width) => {
        if (groups.length === 0) {
            return 0;
        }

        const bubbles = groups.map(group => width - group.sequences.length);

        return bubbles.reduce((acc, curr) => acc + curr, 0);
    }
);
