import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/AppState';
import { SeparateNodesState } from '../../types/SeparateNodesState';

export const selectSeparateNodes = createSelector(
    (state: AppState) => state.separateNodesState,
    (separateNodes: SeparateNodesState) => separateNodes.separateNodes
);