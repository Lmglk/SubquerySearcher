import * as GraphAction from '../actions/graph.actions';
import { Graph } from '../../types/Graph';

export interface GraphState {
    initialGraph: Graph;
    modifiedGraph: Graph;
}

const initialState: GraphState = {
    initialGraph: null,
    modifiedGraph: null,
};

export function graphReducer(
    state = initialState,
    action: GraphAction.ActionsUnion
): GraphState {
    switch (action.type) {
        case GraphAction.ActionTypes.SetInitialGraphAction:
            return {
                ...state,
                initialGraph: action.payload,
            };

        case GraphAction.ActionTypes.SetModifiedGraphAction:
            return {
                ...state,
                modifiedGraph: action.payload,
            };

        default:
            return state;
    }
}
