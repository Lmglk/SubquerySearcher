import { Component, Input } from '@angular/core';

@Component({
    selector: 'ssw-metrics-item',
    templateUrl: './metrics-item.component.html',
    styleUrls: ['./metrics-item.component.css'],
})
export class MetricsItemComponent {
    @Input() public name: string;
    @Input() public value: number;
}
