import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graph } from '../interfaces/Graph';
import { PartitionItem } from '../interfaces/PartitionItem';
import { Group } from '../interfaces/Group';
import { IReplicationItem } from '../interfaces/IReplicationItem';

@Injectable({
    providedIn: 'root',
})
export class ApiGraphService {
    constructor(private readonly http: HttpClient) {}

    public separateNodes(
        graph: Graph,
        info: PartitionItem[]
    ): Observable<Graph> {
        return this.http.post<Graph>('api/graph/separateNodes', {
            graph,
            info,
        });
    }

    public getSchedule(
        graph: Graph,
        mode: number,
        replicationTable: IReplicationItem[]
    ): Observable<Group[]> {
        return this.http.post<Group[]>(
            'api/graph/getSchedule',
            {
                graph: graph,
                replicationTable: replicationTable,
            },
            {
                params: new HttpParams().set('mode', mode.toString()),
            }
        );
    }
}
