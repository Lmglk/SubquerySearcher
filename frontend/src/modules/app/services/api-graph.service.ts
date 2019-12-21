import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graph } from '../interfaces/Graph';
import { InfoSeparate } from '../interfaces/InfoSeparate';
import { Group } from '../interfaces/Group';

@Injectable({
    providedIn: 'root',
})
export class ApiGraphService {
    constructor(private readonly http: HttpClient) {}

    public separateNodes(
        graph: Graph,
        info: InfoSeparate[]
    ): Observable<Graph> {
        return this.http.post<Graph>('api/graph/separateNodes', {
            graph,
            info,
        });
    }

    public getSchedule(graph: Graph, mode: number): Observable<Group[]> {
        return this.http.post<Group[]>('api/graph/getSchedule', graph, {
            params: new HttpParams().set('mode', mode.toString()),
        });
    }
}
