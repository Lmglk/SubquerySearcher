import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { ScheduleModule } from '../schedule/schedule.module';
import { HeaderComponent } from './components/header/header.component';
import { NodeListModule } from '../node-list/node-list.module';
import { MetricsModule } from '../metrics/metrics.module';
import { EffectsModule } from '@ngrx/effects';
import { GraphEffects } from './effects/graph.effects';
import { ScheduleEffects } from './effects/schedule.effects';
import { GraphChartModule } from '../graph-chart/graph-chart.module';
import { commonReducer } from './reducers/commonReducer';
import { graphReducer } from './reducers/graphReducer';
import { scheduleReducer } from './reducers/scheduleReducer';
import { separateNodesReducer } from './reducers/separateNodesReducer';
import { ControlsModule } from '@ssw/controls';
import { NotificationEffects } from './effects/notification.effects';
import { TabComponent } from './components/tab/tab.component';

@NgModule({
    declarations: [AppComponent, HeaderComponent, TabComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            closeButton: true,
        }),
        StoreModule.forRoot({
            commonState: commonReducer,
            graphState: graphReducer,
            scheduleState: scheduleReducer,
            separateNodesState: separateNodesReducer,
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        GraphChartModule,
        ScheduleModule,
        NodeListModule,
        MetricsModule,
        EffectsModule.forRoot([
            GraphEffects,
            ScheduleEffects,
            NotificationEffects,
        ]),
        ControlsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
