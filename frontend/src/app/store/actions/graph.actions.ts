import { Action } from '@ngrx/store';
import { Graph } from '../../types/Graph';
import { OptimizationOption } from '../../enums/OptimizationOptions';

export enum ActionTypes {
    SetInitialGraphAction = '[Graph] Set initial graph',
    SetModifiedGraphAction = '[Graph] Set modified graph',
    UploadGraphAction = '[Graph] Upload graph',
    RejectUploadGraphAction = '[Graph] Reject upload graph',
    ResetModifiedGraphAction = '[Graph] Reset modified graph',
    CalculateGraphAction = '[Schedule] Calculate graph',
}

export class SetInitialGraphAction implements Action {
    readonly type = ActionTypes.SetInitialGraphAction;

    constructor(readonly payload: Graph) {}
}

export class SetModifiedGraphAction implements Action {
    readonly type = ActionTypes.SetModifiedGraphAction;

    constructor(readonly payload: Graph) {}
}

export class UploadGraphAction implements Action {
    readonly type = ActionTypes.UploadGraphAction;

    constructor(readonly payload: File) {}
}

export class RejectUploadGraphAction implements Action {
    readonly type = ActionTypes.RejectUploadGraphAction;
}

export class ResetModifiedGraphAction implements Action {
    readonly type = ActionTypes.ResetModifiedGraphAction;
}

export class CalculateGraphAction implements Action {
    readonly type = ActionTypes.CalculateGraphAction;

    constructor(public readonly payload: OptimizationOption) {}
}

export type ActionsUnion =
    | SetInitialGraphAction
    | SetModifiedGraphAction
    | UploadGraphAction
    | RejectUploadGraphAction
    | ResetModifiedGraphAction
    | CalculateGraphAction;
