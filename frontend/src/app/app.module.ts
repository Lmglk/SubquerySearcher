import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {GraphComponent} from './components/graph/graph.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {ScheduleComponent} from './components/schedule/schedule.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDividerModule, MatSlideToggleModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import { OrderNodePipe } from './pipes/order-node.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    SidebarComponent,
    ScheduleComponent,
    OrderNodePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
