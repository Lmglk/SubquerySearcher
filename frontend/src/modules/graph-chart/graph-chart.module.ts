import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GcNodeComponent } from './components/gc-node/gc-node.component';
import { GcCanvasComponent } from './components/gc-canvas/gc-canvas.component';
import { GcContainerComponent } from './containers/gc-container.component';
import { GcEdgeComponent } from './components/gc-edge/gc-edge.component';
import { GcFreePlacementContainerComponent } from './containers/gc-free-placement-container.component';
import { GcSequencePlacementContainerComponent } from './containers/gc-sequence-placement-container.component';
import { ControlsModule } from '@ssw/controls';

@NgModule({
    declarations: [
        GcContainerComponent,
        GcCanvasComponent,
        GcNodeComponent,
        GcEdgeComponent,
        GcFreePlacementContainerComponent,
        GcSequencePlacementContainerComponent,
    ],
    imports: [CommonModule, ControlsModule],
    exports: [GcContainerComponent],
})
export class GraphChartModule {}
