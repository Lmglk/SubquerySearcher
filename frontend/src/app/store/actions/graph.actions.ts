import { Action } from '@ngrx/store';
import { Graph } from '../../types/Graph';

export enum ActionTypes {
    SetInitialGraphAction = '[Graph] Set initial graph',
    SetModifiedGraphAction = '[Graph] Set modified graph',
    UploadGraphAction = '[Graph] Upload graph',
    RejectUploadGraphAction = '[Graph] Reject upload graph',
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

export type ActionsUnion =
    | SetInitialGraphAction
    | SetModifiedGraphAction
    | UploadGraphAction
    | RejectUploadGraphAction;
