import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectCountNodes } from '../../selectors/selectCountNodes';
import { GraphNode } from '../../../app/interfaces/GraphNode';
import { AppState } from '../../../app/interfaces/AppState';
import { UpdateNodeAction } from '../../../app/actions/UpdateNodeAction';

@Component({
    selector: '[ssw-node-list-item]',
    templateUrl: './node-list-item.component.html',
    styleUrls: ['./node-list-item.component.css'],
})
export class NodeListItemComponent implements OnInit {
    @Input('node') node: GraphNode;

    public nodeCount$: Observable<number>;

    constructor(private readonly store: Store<AppState>) {}

    public ngOnInit(): void {
        this.nodeCount$ = this.store.pipe(
            select(selectCountNodes, { id: this.node.id })
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
