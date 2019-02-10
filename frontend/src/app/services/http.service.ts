import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Graph } from '../types/Graph';
import { Schedule } from '../types/Schedule';
import { OptimizationData } from '../types/OptimizationData';
import { InfoSeparate } from '../types/InfoSeparate';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {}

    public uploadFile(file: File): Observable<Graph> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<Graph>('api/graph/loadGraph', formData);
    }

    public separateNodes(
        graph: Graph,
        info: InfoSeparate[]
    ): Observable<Graph> {
        return this.http.post<Graph>('api/graph/separateNodes', {
            graph,
            info,
        });
    }

    public getSchedule(graph: Graph): Observable<Schedule> {
        return this.http.post<Schedule>('api/graph/getSchedule', graph);
    }

    public optimizeScheduleWithoutTimestamp(
        optimizationData: OptimizationData
    ): Observable<Schedule> {
        return this.http.post<Schedule>(
            'api/graph/optimizeScheduleWithoutTimestamp',
            optimizationData
        );
    }

    public optimizeScheduleWithTimestamp(
        optimizationData: OptimizationData
    ): Observable<Schedule> {
        return this.http.post<Schedule>(
            'api/graph/optimizeScheduleWithTimestamp',
            optimizationData
        );
    }
}
