import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleGroupComponent } from './components/schedule-group/schedule-group.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleRowHeaderComponent } from './components/schedule-row-header/schedule-row-header.component';
import { ScheduleContainerComponent } from './containers/schedule-container.component';
import { ControlsModule } from '@ssw/controls';

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleGroupComponent,
        ScheduleRowHeaderComponent,
        ScheduleContainerComponent,
    ],
    imports: [CommonModule, ControlsModule],
    exports: [ScheduleContainerComponent],
})
export class ScheduleModule {}
