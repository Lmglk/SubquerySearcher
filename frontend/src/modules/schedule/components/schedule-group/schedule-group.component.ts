import { Component, Input } from '@angular/core';
import { Sequence } from '../../../app/types/Sequence';

@Component({
    selector: 'ssw-schedule-group',
    templateUrl: './schedule-group.component.html',
    styleUrls: ['./schedule-group.component.css'],
})
export class ScheduleGroupComponent {
    @Input() sequences: Sequence[];
    @Input() index: number;
    @Input() maxSize: number;

    public getNodeNames({ nodes }: Sequence): string[] {
        return nodes.map(node => node.name);
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
