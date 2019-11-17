import { SetInitialGraphAction } from '../actions/SetInitialGraphActions';
import { GraphState } from '../interfaces/GraphState';

const initialState: GraphState = {
    initialGraph: {
        nodes: [],
        edges: [],
    },
};

export type Action = SetInitialGraphAction;

export function graphReducer(state = initialState, action: Action): GraphState {
    switch (action.type) {
        case SetInitialGraphAction.type:
            return {
                ...state,
                initialGraph: action.payload,
            };

        default:
            return state;
    }
}
