import { ICommonState } from '../interfaces/CommonState';
import { OptimizationMode } from '../enums/OptimizationOptions';
import { SetOptimizationModeAction } from '../actions/SetOptimizationModeAction';

const initialState: ICommonState = {
    optimizationMode: OptimizationMode.DEFAULT,
};

type Actions = SetOptimizationModeAction;

export function commonReducer(
    state = initialState,
    action: Actions
): ICommonState {
    switch (action.type) {
        case SetOptimizationModeAction.type:
            return {
                ...state,
                optimizationMode: action.mode,
            };

        default:
            return state;
    }
}
