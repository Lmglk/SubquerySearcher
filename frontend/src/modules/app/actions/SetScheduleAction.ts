import { Action } from '@ngrx/store';
import { Group } from '../interfaces/Group';

export class SetScheduleAction implements Action {
    public static readonly type = '[Schedule] Set';

    readonly type = SetScheduleAction.type;

    constructor(public readonly payload: Group[]) {}
}
