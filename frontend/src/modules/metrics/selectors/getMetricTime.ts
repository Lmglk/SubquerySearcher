import { createSelector } from '@ngrx/store';
import { selectGroups } from '../../app/selectors/selectGroups';

export const getMetricTime = createSelector(
    selectGroups,
    groups => {
        return groups.length
            ? groups
                  .map(group => group.time)
                  .reduce((acc, curr) => acc + curr, 0)
            : 0;
    }
);
