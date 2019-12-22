import { SetNodesListAction } from '../actions/SetNodesListAction';
import { ResetNodesListAction } from '../actions/ResetNodesListAction';
import { UpdateNodeAction } from '../actions/UpdateNodeAction';
import { SeparateNodesState } from '../interfaces/SeparateNodesState';

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
            return {
                separateNodes: state.separateNodes.map(separateInfo =>
                    separateInfo.nodeId === action.payload.nodeId
                        ? {
                              ...separateInfo,
                              count: action.payload.count,
                          }
                        : separateInfo
                ),
            };

        default:
            return state;
    }
}
