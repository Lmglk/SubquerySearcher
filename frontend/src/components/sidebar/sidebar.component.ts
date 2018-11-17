import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Graph} from "../../types/graph";
import {ToastrService} from "ngx-toastr";
import {OptimicationData} from "../../types/optimication-data";
import {ScheduleResult} from "../../types/schedule-result";
import {Statistic} from "../../types/statistic";
import {Edge} from "../../types/edge";
import {Node} from "../../types/node";

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
    this.modifiedGraph = {...this.graph};
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
    const targetNodeNames = this.getTargetNodes(item.id, this.modifiedGraph.edges);
    const sourceNodeNames = this.getSourceNodes(item.id, this.modifiedGraph.edges);

    let currentEdgeId = this.getMaxId(this.modifiedGraph.edges);
    this.modifiedGraph.nodes = this.removeNode(item.id, this.modifiedGraph.nodes);
    this.modifiedGraph.edges = this.removeInputOutputEdges(item.id, this.modifiedGraph.edges);

    for (let i = 1; i <= item.count; i++) {
      const nodeName = `${item.id}.${i}`;
      this.modifiedGraph.nodes = this.addNode(nodeName, this.modifiedGraph.nodes);
      this.modifiedGraph.edges = this.addTargetEdge(++currentEdgeId, nodeName, this.modifiedGraph.edges, targetNodeNames);
      this.modifiedGraph.edges = this.addSourceEdge(++currentEdgeId, nodeName, this.modifiedGraph.edges, sourceNodeNames);
    }
  }

  private addNode(nodeName: string, nodes: Node[]) {
    return [
      ...nodes,
      {
        id: nodeName,
        label: nodeName,
      }
    ];
  }

  private addTargetEdge(id: number, nodeName: string, edges: Edge[], targetNodeNames: string[]) {
    return [
      ...edges,
      ...targetNodeNames.map(targetNode => ({
        id: ++id,
        source: nodeName,
        target: targetNode
      }))
    ];
  }

  private addSourceEdge(id: number, nodeName: string, edges: Edge[], sourceNodeNames: string[]) {
    return this.modifiedGraph.edges = [
      ...this.modifiedGraph.edges,
      ...sourceNodeNames.map(sourceNode => ({
        id: ++id,
        source: sourceNode,
        target: nodeName
      }))
    ];
  }

  private getSourceNodes(nodeId: string, edges: Edge[]) {
    return edges
      .filter(edge => edge.target === nodeId)
      .map(edge => edge.source);
  }

  private getTargetNodes(nodeId: string, edges: Edge[]) {
    return edges
      .filter(edge => edge.source === nodeId)
      .map(edge => edge.target);
  }

  private getMaxId(edges: Edge[]) {
    return Math.max(...edges.map(edge => edge.id));
  }

  private removeNode(nodeId: string, nodes: Node[]) {
    return nodes.filter(node => node.id != nodeId);
  }

  private removeInputOutputEdges(nodeId: string, edges: Edge[]) {
    return edges.filter(edge => edge.source != nodeId && edge.target != nodeId);
  }
}
