import { Action } from '@ngrx/store';
import { OptimizationData } from '../../types/OptimizationData';

export class OptimizeScheduleWithoutTimeStepAction implements Action {
    public static readonly type =
        '[Schedule] Optimize schedule without time step';

    readonly type = OptimizeScheduleWithoutTimeStepAction.type;

    constructor(public readonly payload: OptimizationData) {}
}
