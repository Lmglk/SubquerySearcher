import * as GraphAction from '../actions/graph.actions';
import { Graph } from '../../types/Graph';

export interface GraphState {
    graph: Graph;
}

const initialState: GraphState = {
    graph: null,
};

export function graphReducer(
    state = initialState,
    action: GraphAction.ActionsUnion
): GraphState {
    switch (action.type) {
        case GraphAction.ActionTypes.SetGraphAction:
            return {
                ...state,
                graph: action.payload,
            };

        default:
            return state;
    }
}
