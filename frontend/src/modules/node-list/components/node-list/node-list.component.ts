import { Component, Input } from '@angular/core';
import { GraphNode } from '../../../app/interfaces/GraphNode';

@Component({
    selector: 'ssw-node-list',
    template: `
        <table *ngIf="nodes.length">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Part</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    *ngFor="let node of nodes | orderNode; trackBy: trackByFn"
                    ssw-node-list-item
                    [node]="node"
                ></tr>
            </tbody>
        </table>
    `,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                overflow: auto;
            }

            table {
                width: 100%;
                table-layout: fixed;
                border-collapse: collapse;
            }

            td,
            th {
                height: 2.4rem;
                text-align: center;
                border: 0.1rem solid var(--color-border);
            }
        `,
    ],
})
export class NodeListComponent {
    @Input() nodes: GraphNode[];

    public trackByFn(index: number, node: GraphNode): string {
        return node.id;
    }
}
