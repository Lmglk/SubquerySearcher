import { Component, Input } from '@angular/core';
import { Group } from '../../../app/types/Group';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
    @Input() data: Group[];
    @Input() maxGroupSize: number;

    public getRowNames(size: number): string[] {
        return Array(size)
            .fill(0)
            .map((data, i) => (i + 1).toString());
    }

    public trackByFn(index, group: Group): string {
        return group.id;
    }
}
