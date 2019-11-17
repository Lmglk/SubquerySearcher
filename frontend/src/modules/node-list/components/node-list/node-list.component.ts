import { Component, Input } from '@angular/core';
import { GraphNode } from '../../../app/interfaces/GraphNode';

@Component({
    selector: 'ssw-node-list',
    templateUrl: './node-list.component.html',
    styleUrls: ['./node-list.component.css'],
})
export class NodeListComponent {
    @Input() nodes: GraphNode[];

    public trackByFn(index: number, node: GraphNode): string {
        return node.id;
    }
}
