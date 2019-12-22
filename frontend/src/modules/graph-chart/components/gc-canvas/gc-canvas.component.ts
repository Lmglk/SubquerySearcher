import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GraphChartNode } from '../../interfaces/GraphChartNode';
import { GraphChartEdge } from '../../interfaces/GraphChartEdge';

@Component({
    selector: 'ssw-gc-canvas',
    templateUrl: './gc-canvas.component.html',
    styleUrls: ['./gc-canvas.component.css'],
})
export class GcCanvasComponent {
    @Input() nodes: GraphChartNode[];
    @Input() edges: GraphChartEdge[];
    @Input() height: number;
    @Input() width: number;
    @Input() nodeRadius: number;
    @Input() horizontalDragging: boolean;
    @Input() verticalDragging: boolean;

    public selectedNodeId: string;

    public handleSelectNode(id: string) {
        this.selectedNodeId = this.selectedNodeId === id ? null : id;
    }

    public handleMoveNode(node: GraphChartNode) {
        this.nodes = [...this.nodes.filter(item => item.id !== node.id), node];

        this.edges = this.edges.map(edge => {
            switch (node.id) {
                case edge.target.id:
                    return { ...edge, target: node };
                case edge.source.id:
                    return { ...edge, source: node };
                default:
                    return edge;
            }
        });
    }

    public isSelectedNode(id: string) {
        return !this.selectedNodeId || id === this.selectedNodeId;
    }

    public isSelectedEdge(edge: GraphChartEdge) {
        if (!this.selectedNodeId) {
            return true;
        }

        return (
            (edge.target && edge.target.id === this.selectedNodeId) ||
            (edge.source && edge.source.id === this.selectedNodeId)
        );
    }

    public trackByFnNode(index: number, node: GraphChartNode) {
        return node.id;
    }

    public trackByFnEdge(index: number, edge: GraphChartEdge) {
        return edge.id;
    }
}
