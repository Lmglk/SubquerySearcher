import { Component, Input } from '@angular/core';
import { Node } from '../../types/Node';

@Component({
    selector: 'app-node-list',
    templateUrl: './node-list.component.html',
    styleUrls: ['./node-list.component.css'],
})
export class NodeListComponent {
    @Input() nodes: Node[];
}
