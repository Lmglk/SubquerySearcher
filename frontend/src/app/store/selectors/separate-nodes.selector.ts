import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectCountNode = createSelector(
    (state: AppState) => state.separateNodesState,
    (separateNodes, prop: { id: string }) =>
        separateNodes.separateNodes.filter(
            infoSeparate => infoSeparate.nodeId === prop.id
        )[0].count
);
