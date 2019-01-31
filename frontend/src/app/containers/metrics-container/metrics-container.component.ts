import { Component } from '@angular/core';
import { AppState } from '../../types/AppState';
import { select, Store } from '@ngrx/store';
import { Metrics } from '../../types/Metrics';
import { Observable } from 'rxjs';
import { selectMetrics } from '../../store/selectors/schedule.selector';

@Component({
    selector: 'app-metrics-container',
    template: `
        <app-metrics [metrics]="metrics$ | async"></app-metrics>
    `,
})
export class MetricsContainerComponent {
    public metrics$: Observable<Metrics>;

    constructor(private readonly store: Store<AppState>) {
        this.metrics$ = this.store.pipe(select(selectMetrics));
    }
}
