import { Action } from '@ngrx/store';
import { InfoSeparate } from '../../types/InfoSeparate';
import { GraphNode } from '../../types/GraphNode';

export enum ActionTypes {
    SetNodesListAction = '[Separate nodes] Set',
    ResetNodesListAction = '[Separate nodes] Reset',
    UpdateNodeAction = '[Separate nodes] Update',
}

export class SetNodesListAction implements Action {
    readonly type = ActionTypes.SetNodesListAction;

    constructor(readonly payload: GraphNode[]) {}
}

export class ResetNodesListAction implements Action {
    readonly type = ActionTypes.ResetNodesListAction;
}

export class UpdateNodeAction implements Action {
    readonly type = ActionTypes.UpdateNodeAction;

    constructor(readonly payload: InfoSeparate) {}
}

export type ActionUnion =
    | SetNodesListAction
    | ResetNodesListAction
    | UpdateNodeAction;
