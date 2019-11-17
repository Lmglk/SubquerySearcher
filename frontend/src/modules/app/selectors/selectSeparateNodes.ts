import { createSelector } from '@ngrx/store';
import { AppState } from '../../interfaces/AppState';
import { SeparateNodesState } from '../../interfaces/SeparateNodesState';

export const selectSeparateNodes = createSelector(
    (state: AppState) => state.separateNodesState,
    (separateNodes: SeparateNodesState) => separateNodes.separateNodes
);
