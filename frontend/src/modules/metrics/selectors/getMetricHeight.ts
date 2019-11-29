import { createSelector } from '@ngrx/store';
import { selectGroups } from '../../app/selectors/selectGroups';

export const getMetricHeight = createSelector(
    selectGroups,
    groups => groups.length
);
