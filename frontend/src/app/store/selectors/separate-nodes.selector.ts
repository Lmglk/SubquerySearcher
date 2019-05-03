import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';
import { SeparateNodesState } from '../reducers/separate-nodes.reducer';
import { InfoSeparate } from '../../types/InfoSeparate';

export const selectSeparateNodes = createSelector(
    (state: AppState) => state.separateNodesState,
    (separateNodes: SeparateNodesState) => separateNodes.separateNodes
);

export const selectCountNode = createSelector(
    selectSeparateNodes,
    (separateNodes: InfoSeparate[], prop: { id: string }) => {
        const node = separateNodes.filter(
            infoSeparate => infoSeparate.nodeId === prop.id
        )[0];
        return node ? node.count : 1;
    }
);
