import { Action } from 'redux';
import { Group } from '../../types/Group';

export class SetScheduleAction implements Action {
    public static readonly type = 'Set schedule';

    public readonly type = SetScheduleAction.type;

    constructor(public readonly payload: Group[]) {}
}
