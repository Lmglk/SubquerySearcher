import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GcNodeComponent } from './components/gc-node/gc-node.component';
import { GcCanvasComponent } from './components/gc-canvas/gc-canvas.component';
import { GcContainerComponent } from './containers/gc-container.component';
import { GcEdgeComponent } from './components/gc-edge/gc-edge.component';
import { ControlsModule } from '@ssw/controls';

@NgModule({
    declarations: [
        GcContainerComponent,
        GcCanvasComponent,
        GcNodeComponent,
        GcEdgeComponent,
    ],
    imports: [CommonModule, ControlsModule],
    exports: [GcContainerComponent],
})
export class GraphChartModule {}
