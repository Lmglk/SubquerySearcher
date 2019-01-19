import { Component, OnInit } from '@angular/core';
import { AppState } from '../../types/AppState';
import { select, Store } from '@ngrx/store';
import { selectGraph } from '../../store/selectors/graph.selector';
import { Graph } from '../../types/Graph';
import { Observable } from 'rxjs';
import { Group } from '../../types/Group';
import { selectGroups } from '../../store/selectors/schedule.selector';

@Component({
    selector: 'app-graph-container',
    template:
        '<graph [graph]="graph$ | async" [schedule]="schedule$ | async"></graph>',
})
export class GraphContainerComponent implements OnInit {
    public graph$: Observable<Graph>;
    public schedule$: Observable<Group[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.graph$ = this.store.pipe(select(selectGraph));
        this.schedule$ = this.store.pipe(select(selectGroups));
    }
}
