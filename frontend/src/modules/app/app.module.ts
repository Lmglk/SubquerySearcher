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
import { graphReducer } from './store/reducers/graphReducer';
import { scheduleReducer } from './store/reducers/scheduleReducer';
import { ScheduleModule } from '../schedule/schedule.module';
import { HeaderComponent } from './components/header/header.component';
import { separateNodesReducer } from './store/reducers/separateNodesReducer';
import { NodeListModule } from '../node-list/node-list.module';
import { MetricsModule } from '../metrics/metrics.module';
import { EffectsModule } from '@ngrx/effects';
import { GraphEffects } from './effects/graph.effects';
import { ScheduleEffects } from './effects/schedule.effects';
import { GraphChartModule } from '../graph-chart/graph-chart.module';
import { BasicComponentsModule } from '../basic-components/basic-components.module';
import { modifiedGraphReducer } from './store/reducers/modifiedGraphReducer';

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            closeButton: true,
        }),
        StoreModule.forRoot({
            graphState: graphReducer,
            modifiedGraphState: modifiedGraphReducer,
            scheduleState: scheduleReducer,
            separateNodesState: separateNodesReducer,
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        BasicComponentsModule,
        GraphChartModule,
        ScheduleModule,
        NodeListModule,
        MetricsModule,
        EffectsModule.forRoot([GraphEffects, ScheduleEffects]),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
