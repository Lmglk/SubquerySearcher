import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Group } from '../../../types/Group';
import * as d3 from 'd3';
import { GraphChartNode } from '../types/GraphChartNode';
import { GraphChartEdge } from '../types/GraphChartEdge';
import { Graph } from '../../../types/Graph';

@Component({
    selector: 'app-gc-sequence-placement-container',
    template: `
        <app-gc-canvas
            [nodes]="scaledNodes"
            [edges]="scaledEdges"
            [height]="height"
            [width]="width"
            [nodeRadius]="nodeRadius"
            [verticalDragging]="true"
            [horizontalDragging]="!groups"
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
export class GcSequencePlacementContainerComponent implements OnChanges {
    @Input() public graph: Graph;
    @Input() public nodeRadius: number;
    @Input() public height: number;
    @Input() public width: number;
    @Input() public groups: Group[];
    @Input() public maxGroupSize: number;

    public scaledNodes: GraphChartNode[] = [];
    public scaledEdges: GraphChartEdge[] = [];

    private scaleX: (value: number) => number;
    private scaleY: (value: number) => number;

    public ngOnChanges(changes: SimpleChanges): void {
        this.calculateScalesForSchedule(this.groups.length, this.maxGroupSize);
        this.calculateNodeTicksForSchedule(this.groups, this.maxGroupSize);
        this.calculateEdgeTicks();
    }

    private calculateScalesForSchedule(
        groupCount: number,
        maxGroupSize: number
    ) {
        this.scaleX = d3
            .scaleLinear()
            .domain([0, groupCount - 1])
            .range([this.nodeRadius, this.width - this.nodeRadius * 2]);
        this.scaleY = d3
            .scaleLinear()
            .domain([0, maxGroupSize - 1])
            .range([this.nodeRadius, this.height - this.nodeRadius * 2]);
    }

    private calculateNodeTicksForSchedule(
        groups: Group[],
        maxGroupSize: number
    ) {
        this.scaledNodes = [];
        groups.forEach((group, groupIndex) => {
            group.sequences.forEach((sequence, sequenceIndex) => {
                sequence.nodes.forEach((node, nodeIndex) => {
                    this.scaledNodes = [
                        ...this.scaledNodes,
                        {
                            ...node,
                            x:
                                this.scaleX(groupIndex) +
                                nodeIndex *
                                    (this.nodeRadius * 2 + this.nodeRadius),
                            y: this.scaleY(maxGroupSize - sequenceIndex - 1),
                        },
                    ];
                });
            });
        });
    }

    private calculateEdgeTicks() {
        this.scaledEdges = this.graph.edges.map(edge => {
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
