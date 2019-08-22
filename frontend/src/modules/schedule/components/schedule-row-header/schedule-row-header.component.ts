import { Component, Input } from '@angular/core';

@Component({
    selector: 'ssw-schedule-row-header',
    templateUrl: './schedule-row-header.component.html',
    styleUrls: ['./schedule-row-header.component.css'],
})
export class ScheduleRowHeaderComponent {
    @Input() headers: string[];

    public trackByFn(index: number): number {
        return index;
    }
}
