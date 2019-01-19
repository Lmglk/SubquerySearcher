import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Graph } from '../types/Graph';
import { Schedule } from '../types/Schedule';
import { OptimizationData } from '../types/OptimizationData';

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

    optimizeScheduleWithoutTimestamp(optimizationData: OptimizationData): Promise<Schedule> {
        return this.http
            .post<Schedule>(
                'http://localhost:8080/api/graph/optimizeScheduleWithoutTimestamp',
                optimizationData
            )
            .toPromise();
    }

    optimizeScheduleWithTimestamp(schedule: Schedule): Promise<Schedule> {
        return this.http
            .post<Schedule>(
                'http://localhost:8080/api/graph/optimizeScheduleWithTimestamp',
                schedule
            )
            .toPromise();
    }
}
