import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphContainerComponent } from './containers/graph-container.component';
import { GraphComponent } from './components/graph/graph.component';

@NgModule({
    declarations: [GraphComponent, GraphContainerComponent],
    imports: [CommonModule],
    exports: [GraphContainerComponent],
})
export class GraphModule {}
