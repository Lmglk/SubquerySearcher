import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-statistic-item',
    templateUrl: './statistic-item.component.html',
    styleUrls: ['./statistic-item.component.css'],
})
export class StatisticItemComponent {
    @Input() public name: string;
    @Input() public value: number;
}
