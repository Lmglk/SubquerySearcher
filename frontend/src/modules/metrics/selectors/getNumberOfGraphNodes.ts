import { createSelector } from '@ngrx/store';
import { getNodes } from '../../app/selectors/getNodes';

export const getNumberOfGraphNodes = createSelector(
    getNodes,
    nodes => nodes.length
);
