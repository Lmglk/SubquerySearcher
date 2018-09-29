import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {IGraph} from "../../types/graph";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('fileUpload') inputFile: ElementRef;

  @Output() graphData: EventEmitter<IGraph> = new EventEmitter();
  @Output() schedule: EventEmitter<string[][]> = new EventEmitter();

  optimizeGraphToogle: boolean;

  public graph: IGraph;
  public separatedNodeList: any;

  private file: File;
  private modifiedGraph: IGraph;

  constructor(private httpService: HttpService) {
    this.separatedNodeList = null;
    this.optimizeGraphToogle = false;
  }

  public changeFile() {
    const fileBrowser = this.inputFile.nativeElement;
    this.file = fileBrowser.files[0];
  }

  public uploadFile() {
    this.httpService.uploadFile(this.file)
      .then((data: IGraph) => {
        this.graph = data;
        this.graphData.emit(this.graph);
        this.schedule.emit(null);
        this.separatedNodeList = this.graph.nodes.map(node => ({
          id: node.id,
          label: node.label,
          count: 1
        }));
      })
      .catch(() => console.error('Uploading file - FAIL'))
  }

  public optimizeGraph() {
    this.schedule.emit(null);
    this.modifiedGraph = {...this.graph};
    this.separatedNodeList.filter(item => item.count > 1).forEach(item => this.separateNodes(item));
    this.httpService.getSchedule(this.modifiedGraph.edges)
      .then((data: string[][]) => {
        if (this.optimizeGraphToogle) {
          const optimizationData = {
            graph: this.modifiedGraph,
            schedule: data
          };
          this.httpService.optimizeSchedule(optimizationData)
            .then((data: string[][]) => {
              this.graphData.emit(this.modifiedGraph);
              this.schedule.emit(data);
            });
        } else {
          this.graphData.emit(this.modifiedGraph);
          this.schedule.emit(data);
        }
      });
  }

  private separateNodes(item) {
    const targets = this.modifiedGraph.edges
      .filter(edge => edge.source === item.id)
      .map(edge => edge.target);

    const sources = this.modifiedGraph.edges
      .filter(edge => edge.target === item.id)
      .map(edge => edge.source);

    let currentEdgeId = Math.max(...this.modifiedGraph.edges.map(edge => edge.id));
    this.modifiedGraph.nodes = this.modifiedGraph.nodes.filter(node => node.id != item.id);
    this.modifiedGraph.edges = this.modifiedGraph.edges.filter(edge => edge.source != item.id && edge.target != item.id);

    for (let i = 1; i <= item.count; i++) {
      this.modifiedGraph.nodes = [
        ...this.modifiedGraph.nodes,
        {
          id: `${item.id}.${i}`,
          label: `${item.id}.${i}`,
        }
      ];

      this.modifiedGraph.edges = [
        ...this.modifiedGraph.edges,
        ...targets.map(targetNode => ({
          id: ++currentEdgeId,
          source: `${item.id}.${i}`,
          target: targetNode
        }))
      ];

      this.modifiedGraph.edges = [
        ...this.modifiedGraph.edges,
        ...sources.map(sourceNode => ({
          id: ++currentEdgeId,
          source: sourceNode,
          target: `${item.id}.${i}`
        }))
      ];
    }
  }
}
