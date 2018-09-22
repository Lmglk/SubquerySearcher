import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public rows = [];
  public schedule: string[][];

  @Input() set data(schedule) {
    this.schedule = schedule;
  }

  ngOnInit() {
    const countRows = Math.max(...this.schedule.map(item => item.length));
    for (let i = 0; i < countRows; i++) {
      this.rows = [
        ...this.rows,
        this.schedule.map(item => item[i] ? item[i] : "")
      ]
    }
    this.rows.reverse();
  }

}
