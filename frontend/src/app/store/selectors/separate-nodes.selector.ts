import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';

export const selectSeparateNodes = createSelector(
    (state: AppState) => state.separateNodesState,
    separateNodes => separateNodes.separateNodes
);

export const selectCountNode = createSelector(
    selectSeparateNodes,
    (separateNodes, prop: { id: string }) => {
        const node = separateNodes.filter(
            infoSeparate => infoSeparate.nodeId === prop.id
        )[0];
        return node ? node.count : 1;
    }
);
