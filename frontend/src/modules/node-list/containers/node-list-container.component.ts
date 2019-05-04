import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app/types/AppState';
import { Observable } from 'rxjs';
import { GraphNode } from '../../app/types/GraphNode';
import { selectNodes } from '../selectors/selectNodes';

@Component({
    selector: 'app-node-list-container',
    template: `
        <app-block class="grid" name="Nodes">
            <app-node-list [nodes]="nodes$ | async"></app-node-list>
        </app-block>
    `,
})
export class NodeListContainerComponent implements OnInit {
    public nodes$: Observable<GraphNode[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.nodes$ = this.store.pipe(select(selectNodes));
    }
}
