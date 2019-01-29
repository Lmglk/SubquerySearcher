import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../types/AppState';
import { Observable } from 'rxjs';
import { selectNodes } from '../../store/selectors/graph.selector';
import { Node } from '../../types/Node';

@Component({
    selector: 'app-node-list-container',
    template: `
        <app-node-list [nodes]="nodes$ | async"></app-node-list>
    `,
})
export class NodeListContainerComponent implements OnInit {
    public nodes$: Observable<Node[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
      this.nodes$ = this.store.pipe(select(selectNodes));
    }
}
