import * as SeparateNodesAction from '../actions/separate-nodes.action';
import { InfoSeparate } from '../../types/InfoSeparate';

export interface SeparateNodesState {
    separateNodes: InfoSeparate[];
}

const initialState: SeparateNodesState = {
    separateNodes: [],
};

export function separateNodesReducer(
    state = initialState,
    action: SeparateNodesAction.ActionUnion
): SeparateNodesState {
    switch (action.type) {
        case SeparateNodesAction.ActionTypes.SetNodesListAction:
            return {
                separateNodes: action.payload.map(node => ({
                    nodeId: node.id,
                    count: 1,
                })),
            };

        case SeparateNodesAction.ActionTypes.ResetNodesListAction:
            return {
                separateNodes: [],
            };

        case SeparateNodesAction.ActionTypes.UpdateNodeAction:
            const separateNodesArray = state.separateNodes.filter(
                infoSeparate => infoSeparate.nodeId !== action.payload.nodeId
            );

            return {
                separateNodes: [...separateNodesArray, action.payload],
            };

        default:
            return state;
    }
}
