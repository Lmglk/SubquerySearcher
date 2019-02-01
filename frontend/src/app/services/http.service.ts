import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Graph } from '../types/Graph';
import { Schedule } from '../types/Schedule';
import { OptimizationData } from '../types/OptimizationData';
import { InfoSeparate } from '../types/InfoSeparate';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {}

    public uploadFile(file: File): Promise<Graph> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http
            .post<Graph>('http://localhost:8080/api/graph/loadGraph', formData)
            .toPromise();
    }

    public separateNodes(graph: Graph, info: InfoSeparate[]): Promise<Graph> {
        return this.http
            .post<Graph>('http://localhost:8080/api/graph/separateNodes', {
                graph,
                info,
            })
            .toPromise();
    }

    public getSchedule(graph: Graph): Promise<Schedule> {
        return this.http
            .post<Schedule>(
                'http://localhost:8080/api/graph/getSchedule',
                graph
            )
            .toPromise();
    }

    public optimizeScheduleWithoutTimestamp(
        optimizationData: OptimizationData
    ): Promise<Schedule> {
        return this.http
            .post<Schedule>(
                'http://localhost:8080/api/graph/optimizeScheduleWithoutTimestamp',
                optimizationData
            )
            .toPromise();
    }

    public optimizeScheduleWithTimestamp(
        optimizationData: OptimizationData
    ): Promise<Schedule> {
        return this.http
            .post<Schedule>(
                'http://localhost:8080/api/graph/optimizeScheduleWithTimestamp',
                optimizationData
            )
            .toPromise();
    }
}
