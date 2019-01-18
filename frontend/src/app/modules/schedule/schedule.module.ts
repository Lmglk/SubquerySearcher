import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleGroupComponent } from './components/schedule-group/schedule-group.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleRowHeaderComponent } from './components/schedule-row-header/schedule-row-header.component';

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleGroupComponent,
        ScheduleRowHeaderComponent,
    ],
    imports: [CommonModule],
    exports: [ScheduleComponent],
})
export class ScheduleModule {}
