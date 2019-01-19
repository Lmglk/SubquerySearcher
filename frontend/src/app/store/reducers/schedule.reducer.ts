import * as ScheduleAction from '../actions/schedule.actions';
import { Group } from '../../types/Group';
import { Statistic } from '../../types/Statistic';

export interface ScheduleState {
    groups: Group[];
    statistic: Statistic;
}

const initialState: ScheduleState = {
    groups: null,
    statistic: null,
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

        default:
            return state;
    }
}
