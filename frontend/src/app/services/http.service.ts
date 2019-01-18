import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Graph } from '../types/graph';
import { ScheduleResult } from '../types/schedule-result';
import { OptimicationData } from '../types/optimication-data';
import { Schedule } from '../types/schedule';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {}

    uploadFile(file: File): Promise<Graph> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http
            .post<Graph>('http://localhost:8080/api/graph/loadGraph', formData)
            .toPromise();
    }

    getSchedule(graph: Graph): Promise<Schedule> {
        return this.http
            .post<Schedule>(
                'http://localhost:8080/api/graph/getSchedule',
                graph
            )
            .toPromise();
    }

    optimizeScheduleWithoutTimestamp(
        optimizationData: OptimicationData
    ): Promise<ScheduleResult> {
        return this.http
            .post<ScheduleResult>(
                'http://localhost:8080/api/graph/optimizeScheduleWithoutTimestamp',
                optimizationData
            )
            .toPromise();
    }

    optimizeScheduleWithTimestamp(
        optimizationData: OptimicationData
    ): Promise<ScheduleResult> {
        return this.http
            .post<ScheduleResult>(
                'http://localhost:8080/api/graph/optimizeScheduleWithTimestamp',
                optimizationData
            )
            .toPromise();
    }
}
