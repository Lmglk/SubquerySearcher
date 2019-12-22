import { Action } from '@ngrx/store';

export class LoadScheduleAction implements Action {
    public static readonly type = '[Graph] Load schedule';

    readonly type = LoadScheduleAction.type;
}
