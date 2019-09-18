import { GraphState } from '../types/GraphState';
import { SetGraphAction } from '../Header/actions/setGraphAction';

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
                ...action.payload,
            };

        default:
            return state;
    }
}
