import * as ScheduleAction from '../actions/schedule.actions';
import { Group } from '../../types/Group';
import { Statistic } from '../../types/statistic';

export interface ScheduleState {
    groups: Group[];
    statistics: Statistic;
}

const initialState: ScheduleState = {
    groups: null,
    statistics: null,
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
