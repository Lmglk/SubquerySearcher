import { Component } from '@angular/core';
import { Graph } from '../../types/graph';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public graphData: Subject<Graph>;
    public schedule: Subject<string[][]>;

    constructor() {
        this.graphData = new Subject<Graph>();
        this.schedule = new Subject<string[][]>();
    }

    getGraphData(graph: Graph) {
        this.graphData.next(graph);
    }

    getSchedule(schedule: string[][]) {
        this.schedule.next(schedule);
    }
}
