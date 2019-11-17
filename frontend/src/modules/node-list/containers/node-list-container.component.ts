import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNodes } from '../selectors/selectNodes';
import { GraphNode } from '../../app/interfaces/GraphNode';
import { AppState } from '../../app/interfaces/AppState';

@Component({
    selector: 'ssw-node-list-container',
    template: `
        <ssw-block class="block">
            <ssw-node-list [nodes]="nodes$ | async"></ssw-node-list>
        </ssw-block>
    `,
    styles: [
        `
            .block {
                height: 100%;
                width: 100%;
            }
        `,
    ],
})
export class NodeListContainerComponent implements OnInit {
    public nodes$: Observable<GraphNode[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.nodes$ = this.store.pipe(select(selectNodes));
    }
}
