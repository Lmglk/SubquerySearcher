import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleGroupComponent } from './components/schedule-group/schedule-group.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleRowHeaderComponent } from './components/schedule-row-header/schedule-row-header.component';
import { ScheduleContainerComponent } from './containers/schedule-container.component';
import { BasicComponentsModule } from '../basic-components/basic-components.module';

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleGroupComponent,
        ScheduleRowHeaderComponent,
        ScheduleContainerComponent,
    ],
    imports: [CommonModule, BasicComponentsModule],
    exports: [ScheduleContainerComponent],
})
export class ScheduleModule {}
