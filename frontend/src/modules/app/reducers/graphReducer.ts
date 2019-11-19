import { GraphState } from '../interfaces/GraphState';
import { SetGraphAction } from '../actions/SetGraphAction';
import { ResetModifiedGraphAction } from '../actions/ResetModifiedGraphAction';
import { SuccessfulGraphUploadAction } from '../actions/SuccessfulGraphUploadAction';

const initialState: GraphState = {
    originalGraph: {
        nodes: [],
        edges: [],
    },
    graph: {
        nodes: [],
        edges: [],
    },
};

export type Action =
    | SuccessfulGraphUploadAction
    | SetGraphAction
    | ResetModifiedGraphAction;

export function graphReducer(state = initialState, action: Action): GraphState {
    switch (action.type) {
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
            };

        case ResetModifiedGraphAction.type:
            return {
                ...state,
                graph: {
                    nodes: [],
                    edges: [],
                },
            };

        default:
            return state;
    }
}
