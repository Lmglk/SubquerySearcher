import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Graph} from "../../types/graph";
import {ToastrService} from "ngx-toastr";
import {OptimicationData} from "../../types/optimication-data";
import {ScheduleResult} from "../../types/schedule-result";
import {Statistic} from "../../types/statistic";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('fileUpload') inputFile: ElementRef;

  @Output() graphData: EventEmitter<Graph> = new EventEmitter();
  @Output() schedule: EventEmitter<string[][]> = new EventEmitter();

  public graph: Graph;
  public statistics: Statistic;
  public separatedNodeList: any;
  public optimizeGraphToogle: boolean;

  private file: File;
  private modifiedGraph: Graph;

  constructor(private toastr: ToastrService,
              private httpService: HttpService) {
    this.separatedNodeList = null;
    this.optimizeGraphToogle = false;
  }

  public changeFile(): void {
    const fileBrowser = this.inputFile.nativeElement;
    this.file = fileBrowser.files[0];
  }

  public async uploadFile(): Promise<void> {
    if (!this.file) {
      return;
    }

    try {
      this.graph = await this.httpService.uploadFile(this.file);
      this.graphData.emit(this.graph);
      this.schedule.emit(null);
      this.separatedNodeList = this.graph.nodes.map(node => ({
        id: node.id,
        label: node.label,
        count: 1
      }));
    } catch (e) {
      this.toastr.error(e.error);
    }
  }

  public async calculateGraph(): Promise<void> {
    this.schedule.emit(null);
    this.modifiedGraph = new Graph(this.graph);
    this.separatedNodeList
      .filter(item => item.count > 1)
      .forEach(item => this.separateNodes(item));

    try {
      let scheduleResult = await this.httpService.getSchedule(this.modifiedGraph.edges);
      if (this.optimizeGraphToogle) {
        scheduleResult = await this.optimizationGraph({
          graph: this.modifiedGraph,
          schedule: scheduleResult.schedule
        });
      }

      this.graphData.emit(this.modifiedGraph);
      this.schedule.emit(scheduleResult.schedule);
      this.statistics = scheduleResult.statistics;
    } catch (e) {
      this.toastr.error(e.error);
    }
  }

  private async optimizationGraph(optimizationData: OptimicationData): Promise<ScheduleResult> {
    return await this.httpService.optimizeSchedule(optimizationData)
  }

  private separateNodes(item) {
    const targetNodes = this.modifiedGraph.getTargetEdges(item.id);
    const sourceNodes = this.modifiedGraph.getSourceEdges(item.id);
    this.modifiedGraph.removeNode(item.id);

    for (let i = 1; i <= item.count; i++) {
      const nodeName = `${item.id}.${i}`;
      this.modifiedGraph.addNode(nodeName);

      targetNodes.forEach(targetNode =>
        this.modifiedGraph.addTargetEdge(nodeName, targetNode.target));

      sourceNodes.forEach(sourceNode =>
        this.modifiedGraph.addSourceEdge(sourceNode.source, nodeName))
    }
  }
}
