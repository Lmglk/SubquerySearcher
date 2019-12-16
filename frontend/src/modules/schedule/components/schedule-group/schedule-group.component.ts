import { Component, Input } from '@angular/core';
import { Sequence } from '../../../app/interfaces/Sequence';
import { GraphNode } from '../../../app/interfaces/GraphNode';

@Component({
    selector: 'ssw-schedule-group',
    template: `
        <div class="group-grid">
            <div
                class="sequence"
                *ngFor="
                    let emptyCell of getEmptyCells();
                    trackBy: trackByFnEmptyCell
                "
            ></div>
            <div
                class="sequence"
                *ngFor="let sequence of sequences.reverse(); trackBy: trackByFn"
            >
                {{ getNodeNames(sequence) }}
            </div>
            <div class="title">M{{ index }}</div>
        </div>
    `,
    styles: [
        `
            :host:last-child {
                border-right: 1px solid var(--color-border);
            }

            .title,
            .sequence {
                display: grid;
                align-items: center;
                justify-items: center;
                height: 32px;
                border: 1px solid var(--color-border);
            }

            .sequence {
                border-bottom: none;
                border-right: none;
            }

            .title {
                border-right: none;
                font-weight: bold;
            }
        `,
    ],
})
export class ScheduleGroupComponent {
    @Input() sequences: Sequence[];
    @Input() nodes: GraphNode[];
    @Input() index: number;
    @Input() maxSize: number;

    public getNodeNames(sequence: Sequence): string[] {
        return sequence.nodes.map(nodeId => {
            const node = this.nodes.find(item => item.id === nodeId);
            return node.name;
        });
    }

    public getEmptyCells() {
        return Array(this.maxSize - this.sequences.length);
    }

    public trackByFn(index: number, sequence: Sequence): string {
        return sequence.id;
    }

    public trackByFnEmptyCell(index: number): number {
        return index;
    }
}
