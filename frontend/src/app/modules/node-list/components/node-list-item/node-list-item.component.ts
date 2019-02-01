import { Component, Input, OnInit } from '@angular/core';
import { GraphNode } from '../../../../types/GraphNode';
import { Observable } from 'rxjs';
import { AppState } from '../../../../types/AppState';
import { select, Store } from '@ngrx/store';
import { selectCountNode } from '../../../../store/selectors/separate-nodes.selector';
import { UpdateNodeAction } from '../../../../store/actions/separate-nodes.action';

@Component({
    selector: '[app-node-list-item]',
    templateUrl: './node-list-item.component.html',
    styleUrls: ['./node-list-item.component.css'],
})
export class NodeListItemComponent implements OnInit {
    @Input('node') node: GraphNode;

    public nodeCount$: Observable<number>;

    constructor(private readonly store: Store<AppState>) {}

    public ngOnInit(): void {
        this.nodeCount$ = this.store.pipe(
            select(selectCountNode, { id: this.node.id })
        );
    }

    public handleChange(event: Event, nodeId: string) {
        const value = (event.target as HTMLInputElement).valueAsNumber;

        this.store.dispatch(
            new UpdateNodeAction({
                nodeId: nodeId,
                count: value,
            })
        );
    }
}
