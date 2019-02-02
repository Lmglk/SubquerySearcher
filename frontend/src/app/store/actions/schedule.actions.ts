import { Action } from '@ngrx/store';
import { Schedule } from '../../types/Schedule';
import { OptimizationData } from '../../types/OptimizationData';

export enum ActionTypes {
    SetScheduleAction = '[Schedule] Set',
    ResetScheduleAction = '[Schedule] Reset',
    OptimizeScheduleWithTimeStep = '[Schedule] Optimize schedule with time step',
    OptimizeScheduleWithoutTimeStep = '[Schedule] Optimize schedule without time step',
    RejectOptimizeSchedule = '[Schedule] Reject optimize schedule',
}

export class SetScheduleAction implements Action {
    readonly type = ActionTypes.SetScheduleAction;

    constructor(public readonly payload: Schedule) {}
}

export class ResetScheduleAction implements Action {
    readonly type = ActionTypes.ResetScheduleAction;
}

export class OptimizeScheduleWithTimeStep implements Action {
    readonly type = ActionTypes.OptimizeScheduleWithTimeStep;

    constructor(public readonly payload: OptimizationData) {}
}

export class OptimizeScheduleWithoutTimeStep implements Action {
    readonly type = ActionTypes.OptimizeScheduleWithoutTimeStep;

    constructor(public readonly payload: OptimizationData) {}
}

export class RejectOptimizeSchedule implements Action {
    readonly type = ActionTypes.RejectOptimizeSchedule;
}

export type ActionUnion = SetScheduleAction | ResetScheduleAction;
