import { Action } from '@ngrx/store';
import { OptimizationMode } from '../enums/OptimizationOptions';

export class SetActiveTabAction implements Action {
    public static readonly type = '[Graph] Set active tab';

    public readonly type = SetActiveTabAction.type;

    constructor(public readonly mode: OptimizationMode) {}
}
