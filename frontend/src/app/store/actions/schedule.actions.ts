import { Action } from '@ngrx/store';
import { Schedule } from '../../types/schedule';

export enum ActionTypes {
    SetScheduleAction = '[Statistic] Set',
}

export class SetScheduleAction implements Action {
    readonly type = ActionTypes.SetScheduleAction;

    constructor(readonly payload: Schedule) {}
}

export type ActionUnion = SetScheduleAction;
