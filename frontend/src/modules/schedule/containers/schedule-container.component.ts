import { Component } from '@angular/core';
import { AppState } from '../../app/types/AppState';
import { select, Store } from '@ngrx/store';
import { Group } from '../../app/types/Group';
import { Observable } from 'rxjs';
import { selectGroups } from '../../app/store/selectors/selectGroups';
import { selectMaxGroupSize } from '../../app/store/selectors/selectMaxGroupSize';

@Component({
    selector: 'app-schedule-container',
    template: `
        <app-schedule
            *ngIf="(groups$ | async).length > 0"
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
