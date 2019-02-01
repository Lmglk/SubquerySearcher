import { Component } from '@angular/core';
import { AppState } from '../../../types/AppState';
import { select, Store } from '@ngrx/store';
import { Group } from '../../../types/Group';
import { Observable } from 'rxjs';
import {
    selectGroups,
    selectMaxGroupSize,
} from '../../../store/selectors/schedule.selector';

@Component({
    selector: 'app-schedule-container',
    template: `
        <app-schedule
            [data]="groups$ | async"
            [maxGroupSize]="maxGroupSize$ | async"
        ></app-schedule>
    `,
})
export class ScheduleContainerComponent {
    public groups$: Observable<Group[]>;
    public maxGroupSize$: Observable<number>;

    constructor(private readonly store: Store<AppState>) {
        this.groups$ = this.store.pipe(select(selectGroups));
        this.maxGroupSize$ = this.store.pipe(select(selectMaxGroupSize));
    }
}
