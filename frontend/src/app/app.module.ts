import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { GraphComponent } from './components/graph/graph.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSlideToggleModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { OrderNodePipe } from './pipes/order-node.pipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { graphReducer } from './store/reducers/graph.reducer';
import { GraphContainerComponent } from './containers/graph-container/graph-container.component';
import { scheduleReducer } from './store/reducers/schedule.reducer';
import { MetricsComponent } from './components/metrics/metrics.component';
import { MetricsContainerComponent } from './containers/metrics-container/metrics-container.component';
import { MetricsItemComponent } from './components/metrics-item/metrics-item.component';
import { ScheduleContainerComponent } from './containers/schedule-container/schedule-container.component';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { HeaderComponent } from './components/header/header.component';
import { BlockComponent } from './components/block/block.component';
import { NodeListComponent } from './components/node-list/node-list.component';
import { NodeListContainerComponent } from './containers/node-list-container/node-list-container.component';

@NgModule({
    declarations: [
        AppComponent,
        GraphComponent,
        OrderNodePipe,
        GraphContainerComponent,
        MetricsComponent,
        MetricsContainerComponent,
        MetricsItemComponent,
        ScheduleContainerComponent,
        HeaderComponent,
        BlockComponent,
        NodeListComponent,
        NodeListContainerComponent,
    ],
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
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatSlideToggleModule,
        ScheduleModule,
    ],
    providers: [HttpService],
    bootstrap: [AppComponent],
})
export class AppModule {}
