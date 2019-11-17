import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMetrics } from '../selectors/selectMetrics';
import { Metrics } from '../../app/interfaces/Metrics';
import { AppState } from '../../app/interfaces/AppState';

@Component({
    selector: 'ssw-metrics-container',
    template: `
        <ssw-metrics [metrics]="metrics$ | async"></ssw-metrics>
    `,
})
export class MetricsContainerComponent {
    public metrics$: Observable<Metrics>;

    constructor(private readonly store: Store<AppState>) {
        this.metrics$ = this.store.pipe(select(selectMetrics));
    }
}
