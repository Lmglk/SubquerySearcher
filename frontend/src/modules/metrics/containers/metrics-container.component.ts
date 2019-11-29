import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app/interfaces/AppState';
import { getMetricHeight } from '../selectors/getMetricHeight';
import { getMetricWidth } from '../selectors/getMetricWidth';
import { getMetricTotalBubbles } from '../selectors/getMetricTotalBubbles';
import { getNumberOfGraphNodes } from '../selectors/getNumberOfGraphNodes';
import { getMetricTime } from '../selectors/getMetricTime';
import { getMetricHardBubbles } from '../selectors/getMetricHardBubbles';

@Component({
    selector: 'ssw-metrics-container',
    template: `
        <ssw-metrics
            [totalBubbles]="totalBubbles$ | async"
            [hardBubbles]="hardBubbles$ | async"
            [numberOfNodes]="numberOfNodes$ | async"
            [height]="height$ | async"
            [width]="width$ | async"
            [time]="time$ | async"
        ></ssw-metrics>
    `,
})
export class MetricsContainerComponent {
    public totalBubbles$: Observable<number>;
    public hardBubbles$: Observable<number>;
    public numberOfNodes$: Observable<number>;
    public height$: Observable<number>;
    public width$: Observable<number>;
    public time$: Observable<number>;

    constructor(private readonly store: Store<AppState>) {
        this.totalBubbles$ = this.store.pipe(select(getMetricTotalBubbles));
        this.hardBubbles$ = this.store.pipe(select(getMetricHardBubbles));
        this.height$ = this.store.pipe(select(getMetricHeight));
        this.width$ = this.store.pipe(select(getMetricWidth));
        this.numberOfNodes$ = this.store.pipe(select(getNumberOfGraphNodes));
        this.time$ = this.store.pipe(select(getMetricTime));
    }
}
