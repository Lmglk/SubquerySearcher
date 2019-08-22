import { Component } from '@angular/core';
import { AppState } from '../../app/types/AppState';
import { select, Store } from '@ngrx/store';
import { Metrics } from '../../app/types/Metrics';
import { Observable } from 'rxjs';
import { selectMetrics } from '../selectors/selectMetrics';

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
