import { SeparateNodesState } from '../../types/SeparateNodesState';
import { SetNodesListAction } from '../actions/SetNodesListAction';
import { ResetNodesListAction } from '../actions/ResetNodesListAction';
import { UpdateNodeAction } from '../actions/UpdateNodeAction';

const initialState: SeparateNodesState = {
    separateNodes: [],
};

export type Action =
    | SetNodesListAction
    | ResetNodesListAction
    | UpdateNodeAction;

export function separateNodesReducer(
    state = initialState,
    action: Action
): SeparateNodesState {
    switch (action.type) {
        case SetNodesListAction.type:
            return {
                separateNodes: action.payload.map(node => ({
                    nodeId: node.id,
                    count: 1,
                })),
            };

        case ResetNodesListAction.type:
            return {
                separateNodes: [],
            };

        case UpdateNodeAction.type:
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
