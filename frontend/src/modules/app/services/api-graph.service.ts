import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graph } from '../types/Graph';
import { InfoSeparate } from '../types/InfoSeparate';

@Injectable({
    providedIn: 'root',
})
export class ApiGraphService {
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
}
