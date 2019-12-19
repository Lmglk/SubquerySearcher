import { Action } from '@ngrx/store';
import { OptimizationMode } from '../enums/OptimizationOptions';

export class SetOptimizationModeAction implements Action {
    public static readonly type = '[Common] Set optimization mode';

    public readonly type = SetOptimizationModeAction.type;

    constructor(public readonly mode: OptimizationMode) {}
}
