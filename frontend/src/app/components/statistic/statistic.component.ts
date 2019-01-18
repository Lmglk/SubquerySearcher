import { Component, Input } from '@angular/core';
import { Statistic } from '../../types/statistic';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent {
    @Input() public statistic: Statistic;
}
