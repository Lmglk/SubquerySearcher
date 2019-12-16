import { Component, Input } from '@angular/core';
import { Group } from '../../../app/interfaces/Group';
import { GraphNode } from '../../../app/interfaces/GraphNode';

@Component({
    selector: 'ssw-schedule',
    template: `
        <div class="grid">
            <ssw-schedule-row-header
                [headers]="getRowNames(maxGroupSize)"
            ></ssw-schedule-row-header>
            <ssw-schedule-group
                *ngFor="
                    let group of data;
                    trackBy: trackByFn;
                    let index = index
                "
                [sequences]="group.sequences"
                [index]="index"
                [maxSize]="maxGroupSize"
                [nodes]="nodes"
            ></ssw-schedule-group>
        </div>
    `,
    styles: [
        `
            .grid {
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: minmax(2rem, max-content);
                overflow: auto;
                height: 100%;
            }
        `,
    ],
})
export class ScheduleComponent {
    @Input() data: Group[];
    @Input() maxGroupSize: number;
    @Input() nodes: GraphNode[];

    public getRowNames(size: number): string[] {
        return Array(size)
            .fill(0)
            .map((data, i) => (i + 1).toString());
    }

    public trackByFn(index, group: Group): string {
        return group.id;
    }
}
