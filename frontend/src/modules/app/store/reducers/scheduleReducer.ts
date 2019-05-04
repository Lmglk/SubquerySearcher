import { ScheduleState } from '../../types/ScheduleState';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { ResetScheduleAction } from '../actions/ResetScheduleAction';
import { ResetGroupsAction } from '../actions/ResetGroupsAction';

const initialState: ScheduleState = {
    groups: [],
    metrics: null,
};

export type Action =
    | SetScheduleAction
    | ResetScheduleAction
    | ResetGroupsAction;

export function scheduleReducer(
    state = initialState,
    action: Action
): ScheduleState {
    switch (action.type) {
        case SetScheduleAction.type:
            return {
                ...state,
                ...action.payload,
            };

        case ResetScheduleAction.type:
            return {
                ...initialState,
            };

        case ResetGroupsAction.type:
            return {
                ...state,
                groups: [],
            };

        default:
            return state;
    }
}
