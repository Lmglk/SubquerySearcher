import { Component } from '@angular/core';
import { AppState } from '../../app/types/AppState';
import { select, Store } from '@ngrx/store';
import { Group } from '../../app/types/Group';
import { Observable } from 'rxjs';
import { selectGroups } from '../../app/store/selectors/selectGroups';
import { selectMaxGroupSize } from '../../app/store/selectors/selectMaxGroupSize';

@Component({
    selector: 'ssw-schedule-container',
    template: `
        <ssw-block class="block">
            <ssw-schedule
                *ngIf="(groups$ | async).length > 0"
                [data]="groups$ | async"
                [maxGroupSize]="maxGroupSize$ | async"
            ></ssw-schedule>
        </ssw-block>
    `,
    styles: [
        `
            .block {
                height: 100%;
                width: 100%;
            }
        `,
    ],
})
export class ScheduleContainerComponent {
    public groups$: Observable<Group[]>;
    public maxGroupSize$: Observable<number>;

    constructor(private readonly store: Store<AppState>) {
        this.groups$ = this.store.pipe(select(selectGroups));
        this.maxGroupSize$ = this.store.pipe(select(selectMaxGroupSize));
    }
}
