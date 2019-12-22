import { OptimizationMode } from '../enums/OptimizationOptions';
import { SetOptimizationModeAction } from '../actions/SetOptimizationModeAction';
import { SuccessfulGraphUploadAction } from '../actions/SuccessfulGraphUploadAction';
import { SetGraphAction } from '../actions/SetGraphAction';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { ResetScheduleAction } from '../actions/ResetScheduleAction';
import { SetNodesListAction } from '../actions/SetNodesListAction';
import { UpdateNodeAction } from '../actions/UpdateNodeAction';
import { IAppState } from '../interfaces/IAppState';

const initialState: IAppState = {
    optimizationMode: OptimizationMode.DEFAULT,
    originalGraph: {
        nodes: [],
        edges: [],
    },
    graph: {
        nodes: [],
        edges: [],
    },
    groups: [],
    separateNodes: [],
};

type Actions =
    | SetOptimizationModeAction
    | SuccessfulGraphUploadAction
    | SetGraphAction
    | SetScheduleAction
    | ResetScheduleAction
    | SetNodesListAction
    | UpdateNodeAction;

export function reducer(state = initialState, action: Actions): IAppState {
    switch (action.type) {
        case SetOptimizationModeAction.type:
            return {
                ...state,
                optimizationMode: action.mode,
                graph: {
                    nodes: [],
                    edges: [],
                },
                groups: [],
            };

        case SuccessfulGraphUploadAction.type:
            return {
                ...state,
                originalGraph: action.graph,
                graph: action.graph,
            };

        case SetGraphAction.type:
            return {
                ...state,
                graph: action.payload,
                groups: [],
            };

        case SetScheduleAction.type:
            return {
                ...state,
                groups: action.payload,
            };

        case ResetScheduleAction.type:
            return {
                ...initialState,
            };

        case SetNodesListAction.type:
            return {
                ...state,
                separateNodes: action.payload.map(node => ({
                    nodeId: node.id,
                    count: 1,
                })),
            };

        case UpdateNodeAction.type:
            return {
                ...state,
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
