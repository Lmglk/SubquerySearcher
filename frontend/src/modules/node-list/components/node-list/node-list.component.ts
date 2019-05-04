import { Component, Input } from '@angular/core';
import { GraphNode } from '../../../app/types/GraphNode';

@Component({
    selector: 'app-node-list',
    templateUrl: './node-list.component.html',
    styleUrls: ['./node-list.component.css'],
})
export class NodeListComponent {
    @Input() nodes: GraphNode[];

    public trackByFn(index: number, node: GraphNode): string {
        return node.id;
    }
}
