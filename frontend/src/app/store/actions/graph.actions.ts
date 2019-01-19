import { Action } from '@ngrx/store';
import { Graph } from '../../types/Graph';

export enum ActionTypes {
    SetGraphAction = '[Graph] Set',
}

export class SetGraphAction implements Action {
    readonly type = ActionTypes.SetGraphAction;

    constructor(readonly payload: Graph) {}
}

export type ActionsUnion = SetGraphAction;
