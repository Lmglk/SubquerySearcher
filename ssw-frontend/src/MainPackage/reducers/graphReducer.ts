import { GraphState } from '../types/GraphState';
import { SetGraphAction } from '../Header/actions/SetGraphAction';

const initialState: GraphState = {
    nodes: [],
    links: [],
};

type Actions = SetGraphAction;

export default function graphReducer(state = initialState, action: Actions): GraphState {
    switch (action.type) {
        case SetGraphAction.type:
            return {
                ...state,
                nodes: action.payload.nodes,
                links: action.payload.links,
            };

        default:
            return state;
    }
}
