import { OptimizationMode } from '../enums/OptimizationOptions';
import { SetOptimizationModeAction } from '../actions/SetOptimizationModeAction';
import { SetOriginalGraphAction } from '../actions/SetOriginalGraphAction';
import { SetGraphAction } from '../actions/SetGraphAction';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { UpdatePartitionItemAction } from '../actions/UpdatePartitionItemAction';
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
    schedule: [],
    separateNodes: [],
};

type Actions =
    | SetOptimizationModeAction
    | SetOriginalGraphAction
    | SetGraphAction
    | SetScheduleAction
    | UpdatePartitionItemAction;

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
                schedule: [],
            };

        case SetOriginalGraphAction.type:
            return {
                ...state,
                originalGraph: action.graph,
                graph: action.graph,
                schedule: [],
                separateNodes: action.graph.nodes.map(node => ({
                    nodeId: node.id,
                    count: 1,
                })),
            };

        case SetGraphAction.type:
            return {
                ...state,
                graph: action.payload,
                schedule: [],
            };

        case SetScheduleAction.type:
            return {
                ...state,
                schedule: action.payload,
            };

        case UpdatePartitionItemAction.type:
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
