import * as ScheduleAction from '../actions/schedule.actions';
import { Group } from '../../types/Group';
import { Metrics } from '../../types/Metrics';

export interface ScheduleState {
    groups: Group[];
    metrics: Metrics;
}

const initialState: ScheduleState = {
    groups: null,
    metrics: null,
};

export function scheduleReducer(
    state = initialState,
    action: ScheduleAction.ActionUnion
): ScheduleState {
    switch (action.type) {
        case ScheduleAction.ActionTypes.SetScheduleAction:
            return {
                ...state,
                ...action.payload,
            };

        case ScheduleAction.ActionTypes.ResetScheduleAction:
            return {
                ...initialState,
            };

        default:
            return state;
    }
}
