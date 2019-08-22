import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeListComponent } from './components/node-list/node-list.component';
import { NodeListItemComponent } from './components/node-list-item/node-list-item.component';
import { NodeListContainerComponent } from './containers/node-list-container.component';
import { OrderNodePipe } from './pipes/order-node.pipe';
import { ControlsModule } from '@ssw/controls';

@NgModule({
    declarations: [
        NodeListComponent,
        NodeListItemComponent,
        NodeListContainerComponent,
        OrderNodePipe,
    ],
    imports: [CommonModule, ControlsModule],
    exports: [NodeListContainerComponent],
})
export class NodeListModule {}
