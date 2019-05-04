import { Component, Input } from '@angular/core';
import { Metrics } from '../../../app/types/Metrics';

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent {
    @Input() public metrics: Metrics;
}
