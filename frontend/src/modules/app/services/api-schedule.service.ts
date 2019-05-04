import { Injectable } from '@angular/core';
import { Graph } from '../types/Graph';
import { Observable } from 'rxjs';
import { Schedule } from '../types/Schedule';
import { OptimizationData } from '../types/OptimizationData';
import { HttpClient } from '@angular/common/http';

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
