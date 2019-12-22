import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectCountNodes } from '../../selectors/selectCountNodes';
import { GraphNode } from '../../../app/interfaces/GraphNode';
import { UpdateNodeAction } from '../../../app/actions/UpdateNodeAction';
import { CalculateGraphAction } from '../../../app/actions/CalculateGraphAction';
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
        this.store.dispatch(new CalculateGraphAction());
    }
}
