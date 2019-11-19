import { Action } from '@ngrx/store';
import { Graph } from '../interfaces/Graph';

export class SuccessfulGraphUploadAction implements Action {
    public static readonly type = '[Graph] Upload graph successful';

    public readonly type = SuccessfulGraphUploadAction.type;

    constructor(public readonly graph: Graph) {}
}
