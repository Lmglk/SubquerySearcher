import { Action } from '@ngrx/store';
import { Schedule } from '../../interfaces/Schedule';

export class SetScheduleAction implements Action {
    public static readonly type = '[Schedule] Set';

    readonly type = SetScheduleAction.type;

    constructor(public readonly payload: Schedule) {}
}
