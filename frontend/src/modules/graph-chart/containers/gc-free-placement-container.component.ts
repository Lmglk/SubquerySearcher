import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GraphChartNode } from '../types/GraphChartNode';
import { GraphChartEdge } from '../types/GraphChartEdge';
import * as d3 from 'd3';
import { Graph } from '../../app/types/Graph';

@Component({
    selector: 'app-free-placement-container',
    template: `
        <app-gc-canvas
            [nodes]="scaledNodes"
            [edges]="scaledEdges"
            [height]="height"
            [width]="width"
            [nodeRadius]="nodeRadius"
            [verticalDragging]="true"
            [horizontalDragging]="true"
        ></app-gc-canvas>
    `,
    styles: [
        `
            :host {
                display: block;
                height: 100%;
                width: 100%;
            }
        `,
    ],
})
export class GcFreePlacementContainerComponent implements OnChanges {
    @Input() public graph: Graph;
    @Input() public nodeRadius: number;
    @Input() public height: number;
    @Input() public width: number;

    public scaledNodes: GraphChartNode[] = [];
    public scaledEdges: GraphChartEdge[] = [];

    private nodes: GraphChartNode[] = [];
    private edges: GraphChartEdge[] = [];
    private scaleX: (value: number) => number;
    private scaleY: (value: number) => number;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.height || changes.width) {
            this.calculateScales();
            this.calculateNodeTicks();
            this.calculateEdgeTicks();
        }

        if (changes.graph) {
            this.nodes = this.graph.nodes.map(node => ({
                ...node,
                x: Math.random(),
                y: Math.random(),
            }));

            this.edges = this.graph.edges.map(edge => ({
                id: edge.id,
                source: this.nodes.find(node => node.id === edge.source.id),
                target: this.nodes.find(node => node.id === edge.target.id),
            }));
            this.calculateNodeTicks();
            this.calculateEdgeTicks();
        }
    }

    private calculateScales() {
        this.scaleX = d3
            .scaleLinear()
            .domain([0, 1])
            .range([this.nodeRadius, this.width - this.nodeRadius * 2])
            .interpolate(d3.interpolateRound);

        this.scaleY = d3
            .scaleLinear()
            .domain([0, 1])
            .range([this.nodeRadius, this.height - this.nodeRadius * 2])
            .interpolate(d3.interpolateRound);
    }

    private calculateNodeTicks() {
        this.scaledNodes = this.nodes.map(node => ({
            ...node,
            x: this.scaleX(node.x),
            y: this.scaleY(node.y),
        }));
    }

    private calculateEdgeTicks() {
        this.scaledEdges = this.edges.map(edge => {
            return {
                id: edge.id,
                source: this.scaledNodes.find(
                    node => !!edge.source && node.id === edge.source.id
                ),
                target: this.scaledNodes.find(
                    node => !!edge.target && node.id === edge.target.id
                ),
            };
        });
    }
}
