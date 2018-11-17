import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Edge} from "../types/edge";
import {Graph} from "../types/graph";
import {ScheduleResult} from "../types/schedule-result";
import {OptimicationData} from "../types/optimication-data";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Graph>('http://localhost:8080/api/graph/loadGraph', formData)
      .toPromise();
  }

  getSchedule(edgeList: Edge[]) {
    return this.http.post<ScheduleResult>('http://localhost:8080/api/graph/getSchedule', edgeList)
      .toPromise();
  }

  optimizeSchedule(optimizationData: OptimicationData) {
    return this.http.post<ScheduleResult>('http://localhost:8080/api/graph/optimizeSchedule', optimizationData)
      .toPromise();
  }
}
