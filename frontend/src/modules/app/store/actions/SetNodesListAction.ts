import { Action } from '@ngrx/store';
import { GraphNode } from '../../types/GraphNode';

export class SetNodesListAction implements Action {
    public static readonly type = '[Separate nodes] Set';

    readonly type = SetNodesListAction.type;

    constructor(readonly payload: GraphNode[]) {}
}
