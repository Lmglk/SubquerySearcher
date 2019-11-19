import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Graph } from '../interfaces/Graph';
import { Schedule } from '../interfaces/Schedule';

@Injectable({
    providedIn: 'root',
})
export class ApiScheduleService {
    constructor(private readonly http: HttpClient) {}

    public getSchedule(graph: Graph): Observable<Schedule> {
        return this.http.post<Schedule>('api/graph/getSchedule', graph);
    }

    public optimizeSchedule(
        graph: Graph,
        schedule: Schedule,
        mode: number
    ): Observable<Schedule> {
        return this.http.post<Schedule>(
            'api/graph/optimizeSchedule',
            { graph: graph, schedule: schedule },
            {
                params: new HttpParams().set('mode', mode.toString()),
            }
        );
    }
}
