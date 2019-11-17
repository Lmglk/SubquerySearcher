import { Component, Input } from '@angular/core';
import { Metrics } from '../../../app/interfaces/Metrics';

@Component({
    selector: 'ssw-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent {
    @Input() public metrics: Metrics;
}
