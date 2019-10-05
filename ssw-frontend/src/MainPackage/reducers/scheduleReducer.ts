import { ScheduleState } from '../types/ScheduleState';
import { SetScheduleAction } from '../Header/actions/SetScheduleAction';

const initialState: ScheduleState = {
    groups: [],
};

type Actions = SetScheduleAction;

export function scheduleReducer(state = initialState, action: Actions): ScheduleState {
    switch (action.type) {
        case SetScheduleAction.type:
            return {
                ...state,
                groups: action.payload,
            };

        default:
            return state;
    }
}
