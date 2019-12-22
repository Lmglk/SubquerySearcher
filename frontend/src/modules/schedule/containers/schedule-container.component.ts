import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from '../../app/interfaces/Group';
import { selectGroups } from '../../app/selectors/selectGroups';
import { getMetricWidth } from '../../metrics/selectors/getMetricWidth';
import { GraphNode } from '../../app/interfaces/GraphNode';
import { getNodes } from '../../app/selectors/getNodes';
import { IRootState } from '../../app/interfaces/IRootState';

@Component({
    selector: 'ssw-schedule-container',
    template: `
        <ssw-block class="block">
            <ssw-schedule
                *ngIf="(groups$ | async).length > 0"
                [data]="groups$ | async"
                [maxGroupSize]="maxGroupSize$ | async"
                [nodes]="graphNodes$ | async"
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
    public graphNodes$: Observable<GraphNode[]>;

    constructor(private readonly store: Store<IRootState>) {
        this.groups$ = this.store.pipe(select(selectGroups));
        this.maxGroupSize$ = this.store.pipe(select(getMetricWidth));
        this.graphNodes$ = this.store.pipe(select(getNodes));
    }
}
