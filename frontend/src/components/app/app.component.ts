import {Component} from '@angular/core';
import {IGraph} from "../../types/graph";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public graphData: IGraph;
  public schedule: string[][];

  getGraphData(graph: IGraph) {
    this.graphData = graph;
  }

  getSchedule(schedule: string[][]) {
    this.schedule = schedule;
  }
}
