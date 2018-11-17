import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { GraphComponent } from './graph/graph.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "../services/http.service";
import { ScheduleComponent } from './schedule/schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDividerModule, MatSlideToggleModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    SidebarComponent,
    ScheduleComponent
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
export class AppModule { }
