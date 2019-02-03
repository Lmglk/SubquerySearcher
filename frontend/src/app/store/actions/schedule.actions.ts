import { Action } from '@ngrx/store';
import { Schedule } from '../../types/Schedule';
import { OptimizationData } from '../../types/OptimizationData';
import { OptimizationOption } from '../../enums/OptimizationOptions';
import { Graph } from '../../types/Graph';

export enum ActionTypes {
    SetScheduleAction = '[Schedule] Set',
    ResetScheduleAction = '[Schedule] Reset',
    OptimizeScheduleWithTimeStepAction = '[Schedule] Optimize schedule with time step',
    OptimizeScheduleWithoutTimeStepAction = '[Schedule] Optimize schedule without time step',
    RejectOptimizeScheduleAction = '[Schedule] Reject optimize schedule',
    LoadScheduleAction = '[Schedule] Load',
}

export class SetScheduleAction implements Action {
    readonly type = ActionTypes.SetScheduleAction;

    constructor(public readonly payload: Schedule) {}
}

export class ResetScheduleAction implements Action {
    readonly type = ActionTypes.ResetScheduleAction;
}

export class OptimizeScheduleWithTimeStep implements Action {
    readonly type = ActionTypes.OptimizeScheduleWithTimeStepAction;

    constructor(public readonly payload: OptimizationData) {}
}

export class OptimizeScheduleWithoutTimeStep implements Action {
    readonly type = ActionTypes.OptimizeScheduleWithoutTimeStepAction;

    constructor(public readonly payload: OptimizationData) {}
}

export class RejectOptimizeSchedule implements Action {
    readonly type = ActionTypes.RejectOptimizeScheduleAction;
}

export class LoadScheduleAction implements Action {
    readonly type = ActionTypes.LoadScheduleAction;

    constructor(
        public readonly payload: { graph: Graph; option: OptimizationOption }
    ) {}
}

export type ActionUnion = SetScheduleAction | ResetScheduleAction;
