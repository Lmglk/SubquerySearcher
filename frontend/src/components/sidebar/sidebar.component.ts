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

  private file: File;

  constructor(private httpService: HttpService) {}

  public changeFile() {
    const fileBrowser = this.inputFile.nativeElement;
    this.file = fileBrowser.files[0];
  }

  public uploadFile() {
    this.httpService.uploadFile(this.file)
      .then((data: IGraph) => {
        let graph = data;
        graph.nodes = graph.nodes.map(node => ({
          ...node,
          x: Math.round(Math.random() * 100),
          y: Math.round(Math.random() * 100),
          size: 1
        }));
        graph.edges = graph.edges.map(edge => ({
          ...edge,
          size: 1,
        }));
        this.graphData.emit(graph);
      })
      .catch(() => console.error('Uploading file - FAIL'))
  }
}
