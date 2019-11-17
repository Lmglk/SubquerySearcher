import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Graph } from '../interfaces/Graph';
import { Schedule } from '../interfaces/Schedule';
import { OptimizationData } from '../interfaces/OptimizationData';

@Injectable({
    providedIn: 'root',
})
export class ApiScheduleService {
    constructor(private readonly http: HttpClient) {}

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
