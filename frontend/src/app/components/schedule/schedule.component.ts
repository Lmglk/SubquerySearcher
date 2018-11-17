import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Schedule} from "../../types/schedule";

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() data: Observable<Schedule>;

  public rows = [];
  public schedule: Schedule;

  ngOnInit(): void {
    this.data.subscribe(schedule => {
      this.schedule = schedule;
      if (this.schedule) {
        const countRows = Math.max(...this.schedule.map(item => item.length));
        for (let i = 0; i < countRows; i++) {
          this.rows = [
            ...this.rows,
            this.schedule.map(item => item[i] ? item[i] : "")
          ]
        }
        this.rows.reverse();
      } else {
        this.rows = [];
      }
    })
  }
}
