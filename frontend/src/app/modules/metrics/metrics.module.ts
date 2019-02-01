import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricsComponent } from './components/metrics/metrics.component';
import { MetricsItemComponent } from './components/metrics-item/metrics-item.component';
import { MetricsContainerComponent } from './containers/metrics-container.component';

@NgModule({
    declarations: [
        MetricsComponent,
        MetricsItemComponent,
        MetricsContainerComponent,
    ],
    imports: [CommonModule],
    exports: [MetricsContainerComponent],
})
export class MetricsModule {}
