import { Component, OnInit } from '@angular/core';
import { AppState } from '../../types/AppState';
import { select, Store } from '@ngrx/store';
import { selectGraph } from '../../store/selectors/graph.selector';
import { Graph } from '../../types/graph';
import { Observable } from 'rxjs';

// template: '<graph [graphData]="graphData" [scheduleData]="schedule" *ngIf="graphData"></graph>',
@Component({
    selector: 'app-graph-container',
    template: '<graph [graph]="graph$ | async"></graph>',
})
export class GraphContainerComponent implements OnInit {
    public graph$: Observable<Graph>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.graph$ = this.store.pipe(select(selectGraph));
    }
}
