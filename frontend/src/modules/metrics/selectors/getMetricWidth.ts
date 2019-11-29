import { createSelector } from '@ngrx/store';
import { selectGroups } from '../../app/selectors/selectGroups';

export const getMetricWidth = createSelector(
    selectGroups,
    groups =>
        groups.length
            ? Math.max(...groups.map(group => group.sequences.length))
            : 0
);
