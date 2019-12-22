import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getCountNodes } from '../../selectors/getCountNodes';
import { GraphNode } from '../../../app/interfaces/GraphNode';
import { UpdatePartitionItemAction } from '../../../app/actions/UpdatePartitionItemAction';
import { IRootState } from '../../../app/interfaces/IRootState';

@Component({
    selector: '[ssw-node-list-item]',
    templateUrl: './node-list-item.component.html',
    styleUrls: ['./node-list-item.component.css'],
})
export class NodeListItemComponent implements OnInit {
    @Input('node') node: GraphNode;

    public nodeCount$: Observable<number>;

    constructor(private readonly store: Store<IRootState>) {}

    public ngOnInit(): void {
        this.nodeCount$ = this.store.pipe(
            select(getCountNodes, { id: this.node.id })
        );
    }

    public handleChange(event: Event, nodeId: string) {
        const value = (event.target as HTMLInputElement).valueAsNumber;

        this.store.dispatch(
            new UpdatePartitionItemAction({
                nodeId: nodeId,
                count: value,
            })
        );
    }
}
