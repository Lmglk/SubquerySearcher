import {Component} from '@angular/core';
import {IGraph} from "../../types/graph";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public graphData: Subject<IGraph>;
  public schedule: Subject<string[][]>;

  constructor() {
    this.graphData = new Subject<IGraph>();
    this.schedule = new Subject<string[][]>()
  }

  getGraphData(graph: IGraph) {
    this.graphData.next(graph);
  }

  getSchedule(schedule: string[][]) {
    this.schedule.next(schedule);
  }
}
