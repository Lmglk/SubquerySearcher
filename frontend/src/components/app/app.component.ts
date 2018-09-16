import {Component} from '@angular/core';
import {IGraph} from "../../types/graph";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public graphData: IGraph;

  getGraphData(graph: IGraph) {
    this.graphData = graph;
  }
}
