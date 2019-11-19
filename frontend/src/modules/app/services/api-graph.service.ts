import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graph } from '../interfaces/Graph';
import { InfoSeparate } from '../interfaces/InfoSeparate';

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
}
