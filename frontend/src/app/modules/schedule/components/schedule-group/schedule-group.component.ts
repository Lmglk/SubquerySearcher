import { Component, Input } from '@angular/core';
import { Group } from '../../../../types/Group';
import { Sequence } from '../../../../types/Sequence';

@Component({
    selector: 'app-schedule-group',
    templateUrl: './schedule-group.component.html',
    styleUrls: ['./schedule-group.component.css'],
})
export class ScheduleGroupComponent {
    @Input() group: Group;
    @Input() index: number;
    @Input() maxSize: number;

    public getNodeNames({ nodes }: Sequence): string[] {
        return nodes.map(node => node.name);
    }

    public getEmptyCells() {
        return Array(this.maxSize - this.group.sequences.length);
    }
}
