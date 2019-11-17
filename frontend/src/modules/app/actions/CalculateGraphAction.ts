import { Action } from '@ngrx/store';
import { OptimizationOption } from '../enums/OptimizationOptions';

export class CalculateGraphAction implements Action {
    public static readonly type = '[Schedule] Calculate graph';

    readonly type = CalculateGraphAction.type;

    constructor(public readonly payload: OptimizationOption) {}
}
