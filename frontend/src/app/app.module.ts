import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { graphReducer } from './store/reducers/graph.reducer';
import { scheduleReducer } from './store/reducers/schedule.reducer';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { HeaderComponent } from './components/header/header.component';
import { BlockComponent } from './components/block/block.component';
import { separateNodesReducer } from './store/reducers/separate-nodes.reducer';
import { NodeListModule } from './modules/node-list/node-list.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { EffectsModule } from '@ngrx/effects';
import { GraphEffects } from './effects/graph.effects';
import { ScheduleEffects } from './effects/schedule.effects';
import { GraphChartModule } from './modules/graph-chart/graph-chart.module';

@NgModule({
    declarations: [AppComponent, HeaderComponent, BlockComponent],
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
            scheduleState: scheduleReducer,
            separateNodesState: separateNodesReducer,
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        MatButtonModule,
        GraphChartModule,
        ScheduleModule,
        NodeListModule,
        MetricsModule,
        EffectsModule.forRoot([GraphEffects, ScheduleEffects]),
    ],
    providers: [HttpService],
    bootstrap: [AppComponent],
})
export class AppModule {}
