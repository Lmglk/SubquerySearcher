import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEdge} from "../types/edge";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8080/api/graph/loadGraph', formData).toPromise();
  }

  getSchedule(edgeList: IEdge[]) {
    return this.http.post('http://localhost:8080/api/graph/getSchedule', edgeList).toPromise();
  }
}
