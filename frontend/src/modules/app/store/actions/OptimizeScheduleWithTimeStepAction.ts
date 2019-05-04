import { Action } from '@ngrx/store';
import { OptimizationData } from '../../types/OptimizationData';

export class OptimizeScheduleWithTimeStepAction implements Action {
    public static readonly type = '[Schedule] Optimize schedule with time step';

    readonly type = OptimizeScheduleWithTimeStepAction.type;

    constructor(public readonly payload: OptimizationData) {}
}
