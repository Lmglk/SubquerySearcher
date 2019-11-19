import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import autobind from 'autobind-decorator';
import { Graph } from '../interfaces/Graph';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private readonly idGeneratorService: IdGeneratorService) {}

    public parseFileToGraph(file: File): Observable<Graph> {
        const fileReader = new FileReader();
        const fileReader$ = fromEvent(fileReader, 'load');

        fileReader.readAsText(file);

        return fileReader$.pipe(map(this.parseFile));
    }

    @autobind
    private parseFile(event: ProgressEvent): Graph {
        const reader = event.target as FileReader;
        const result = reader.result
            .toString()
            .trim()
            .split(/\r\n|\n/)
            .map(str => str.length && str.split(' '));

        const nodeMap: Map<string, number> = new Map();
        result.forEach(row => {
            if (row[0] === undefined || row[1] === undefined) {
                throw new Error('Failed to parse file');
            }

            const time = row[2] ? Number.parseInt(row[2], 10) : 1;
            nodeMap.set(row[0], time).set(row[1], 1);
        });

        const nodes = Array.from(nodeMap).map(value => ({
            id: this.idGeneratorService.getID(),
            name: value[0],
            time: value[1],
        }));

        const edges = result.map(value => {
            const sourceNode = nodes.find(node => node.name === value[0]);
            const targetNode = nodes.find(node => node.name === value[1]);

            return {
                id: this.idGeneratorService.getID(),
                sourceId: sourceNode.id,
                targetId: targetNode.id,
            };
        });

        return {
            edges: edges,
            nodes: nodes,
        };
    }
}
