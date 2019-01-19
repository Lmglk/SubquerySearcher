import { Component } from '@angular/core';
import { AppState } from '../../types/AppState';
import { select, Store } from '@ngrx/store';
import { Statistic } from '../../types/Statistic';
import { Observable } from 'rxjs';
import { selectStatistic } from '../../store/selectors/schedule.selector';

@Component({
    selector: 'app-statistic-container',
    template:
        '<app-statistic [statistic]="statistic$ | async"></app-statistic>',
})
export class StatisticContainerComponent {
    public statistic$: Observable<Statistic>;

    constructor(private readonly store: Store<AppState>) {
        this.statistic$ = this.store.pipe(select(selectStatistic));
    }
}
