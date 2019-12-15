import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Graph } from '../interfaces/Graph';
import { Group } from '../interfaces/Group';

@Injectable({
    providedIn: 'root',
})
export class ApiScheduleService {
    constructor(private readonly http: HttpClient) {}

    public getSchedule(graph: Graph): Observable<Group[]> {
        return this.http.post<Group[]>('api/graph/getSchedule', graph);
    }

    public optimizeSchedule(
        graph: Graph,
        schedule: Group[],
        mode: number
    ): Observable<Group[]> {
        return this.http.post<Group[]>(
            'api/graph/optimizeSchedule',
            { graph: graph, schedule: schedule },
            {
                params: new HttpParams().set('mode', mode.toString()),
            }
        );
    }
}
