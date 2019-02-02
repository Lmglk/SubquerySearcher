import { Action } from '@ngrx/store';
import { Schedule } from '../../types/Schedule';

export enum ActionTypes {
    SetScheduleAction = '[Schedule] Set',
    ResetScheduleAction = '[Schedule] Reset',
}

export class SetScheduleAction implements Action {
    readonly type = ActionTypes.SetScheduleAction;

    constructor(readonly payload: Schedule) {}
}

export class ResetScheduleAction implements Action {
    readonly type = ActionTypes.ResetScheduleAction;
}

export type ActionUnion = SetScheduleAction | ResetScheduleAction;
