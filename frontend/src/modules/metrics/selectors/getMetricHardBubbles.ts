import { createSelector } from '@ngrx/store';
import { selectGroups } from '../../app/selectors/selectGroups';
import { getMetricWidth } from './getMetricWidth';

export const getMetricHardBubbles = createSelector(
    selectGroups,
    getMetricWidth,
    (groups, width) => {
        if (groups.length === 0) {
            return 0;
        }

        const lastFullIndex = groups.findIndex(
            group => group.sequences.length === width
        );

        return groups
            .filter((group, index) => index < lastFullIndex)
            .reduce((acc, curr) => acc + (width - curr.sequences.length), 0);
    }
);
