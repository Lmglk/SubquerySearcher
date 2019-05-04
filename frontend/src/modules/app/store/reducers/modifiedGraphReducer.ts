import { ModifiedGraphState } from '../../types/ModifiedGraphState';
import { SetModifiedGraphAction } from '../actions/SetModifiedGraphAction';
import { ResetModifiedGraphAction } from '../actions/ResetModifiedGraphAction';

const initialState: ModifiedGraphState = {
    modifiedGraph: {
        nodes: [],
        edges: [],
    },
};

export type Action = SetModifiedGraphAction | ResetModifiedGraphAction;

export function modifiedGraphReducer(state = initialState, action: Action) {
    switch (action.type) {
        case SetModifiedGraphAction.type:
            return {
                ...state,
                modifiedGraph: action.payload,
            };

        case ResetModifiedGraphAction.type:
            return {
                ...state,
                modifiedGraph: {
                    nodes: [],
                    edges: [],
                },
            };

        default:
            return state;
    }
}
