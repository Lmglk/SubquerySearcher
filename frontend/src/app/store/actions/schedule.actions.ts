import { Action } from '@ngrx/store';
import { Schedule } from '../../types/Schedule';

export enum ActionTypes {
    SetScheduleAction = '[Metrics] Set',
}

export class SetScheduleAction implements Action {
    readonly type = ActionTypes.SetScheduleAction;

    constructor(readonly payload: Schedule) {}
}

export type ActionUnion = SetScheduleAction;
