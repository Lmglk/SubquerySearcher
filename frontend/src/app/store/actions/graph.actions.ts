import { Action } from '@ngrx/store';
import { Graph } from '../../types/Graph';

export enum ActionTypes {
    SetInitialGraphAction = '[Graph] Set initial graph',
    SetModifiedGraphAction = '[Graph] Set modified graph',
}

export class SetInitialGraphAction implements Action {
    readonly type = ActionTypes.SetInitialGraphAction;

    constructor(readonly payload: Graph) {}
}

export class SetModifiedGraphAction implements Action {
    readonly type = ActionTypes.SetModifiedGraphAction;

    constructor(readonly payload: Graph) {}
}

export type ActionsUnion = SetInitialGraphAction | SetModifiedGraphAction;
