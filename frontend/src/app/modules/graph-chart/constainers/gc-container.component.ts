import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../types/AppState';
import { combineLatest, Subscription } from 'rxjs';
import { selectGraph } from '../../../store/selectors/graph.selector';
import { GraphChartNode } from '../types/GraphChartNode';
import { GraphChartEdge } from '../types/GraphChartEdge';
import * as d3 from 'd3';
import {
    selectGroups,
    selectMaxGroupSize,
} from '../../../store/selectors/schedule.selector';
import { Group } from '../../../types/Group';

@Component({
    selector: 'app-gc-container',
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
export class GcContainerComponent implements AfterViewInit, OnDestroy {
    public readonly nodeRadius = 15;

    public scaledNodes: GraphChartNode[] = [];
    public scaledEdges: GraphChartEdge[] = [];
    public groups: Group[];
    public height: number;
    public width: number;

    private nodes: GraphChartNode[] = [];
    private edges: GraphChartEdge[] = [];
    private maxGroupSize: number;
    private scaleX: (number) => number;
    private scaleY: (number) => number;

    private subscription: Subscription;

    constructor(
        private readonly store: Store<AppState>,
        private elRef: ElementRef
    ) {}

    public ngAfterViewInit(): void {
        setTimeout(() => this.getContentSize());

        this.subscription = combineLatest(
            this.store.pipe(select(selectGraph)),
            this.store.pipe(select(selectGroups)),
            this.store.pipe(select(selectMaxGroupSize))
        ).subscribe(([{ nodes, edges }, groups, maxGroupSize]) => {
            this.groups = groups;
            this.maxGroupSize = maxGroupSize;

            if (groups) {
                this.calculateScalesForSchedule(groups.length, maxGroupSize);
                this.calculateNodeTicksForSchedule(groups, maxGroupSize);
            } else {
                this.nodes = nodes.map(node => ({
                    ...node,
                    x: Math.random(),
                    y: Math.random(),
                }));
                this.edges = edges.map(edge => ({
                    id: edge.id,
                    source: this.nodes.find(node => node.id === edge.source.id),
                    target: this.nodes.find(node => node.id === edge.target.id),
                }));
                this.calculateScales();
                this.calculateNodeTicks();
            }
            this.calculateEdgeTicks();
        });
    }

    @HostListener('window:resize')
    private handleResize() {
        this.getContentSize();

        if (this.groups) {
            this.calculateScalesForSchedule(
                this.groups.length,
                this.maxGroupSize
            );
            this.calculateNodeTicksForSchedule(this.groups, this.maxGroupSize);
        } else {
            this.calculateScales();
            this.calculateNodeTicks();
        }
        this.calculateEdgeTicks();
    }

    private calculateScales() {
        this.scaleX = d3
            .scaleLinear()
            .domain([0, 1])
            .range([this.nodeRadius, this.width - this.nodeRadius * 2]);

        this.scaleY = d3
            .scaleLinear()
            .domain([0, 1])
            .range([this.nodeRadius, this.height - this.nodeRadius * 2]);
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

    private calculateNodeTicks() {
        this.scaledNodes = this.nodes.map(node => ({
            ...node,
            x: this.scaleX(node.x),
            y: this.scaleY(node.y),
        }));
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
        this.scaledEdges = this.edges.map(edge => ({
            id: edge.id,
            source: this.scaledNodes.find(node => node.id === edge.source.id),
            target: this.scaledNodes.find(node => node.id === edge.target.id),
        }));
    }

    private getContentSize() {
        this.height = this.elRef.nativeElement.clientHeight;
        this.width = this.elRef.nativeElement.clientWidth;
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
