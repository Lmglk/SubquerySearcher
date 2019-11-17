import { Action } from '@ngrx/store';
import { Graph } from '../interfaces/Graph';
import { OptimizationOption } from '../enums/OptimizationOptions';

export class LoadScheduleAction implements Action {
    public static readonly type = '[Schedule] Load';

    readonly type = LoadScheduleAction.type;

    constructor(
        public readonly payload: { graph: Graph; option: OptimizationOption }
    ) {}
}
