import { Action } from '@ngrx/store';

export class CalculateGraphAction implements Action {
    public static readonly type = '[Schedule] Calculate graph';

    readonly type = CalculateGraphAction.type;
}
