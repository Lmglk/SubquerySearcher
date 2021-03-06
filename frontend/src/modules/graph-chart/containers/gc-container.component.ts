import {
    AfterContentInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { getGraph } from '../selectors/getGraph';
import { Graph } from '../../app/interfaces/Graph';
import { Group } from '../../app/interfaces/Group';
import { IAppState } from '../../app/interfaces/IAppState';
import { getSchedule } from '../../app/selectors/getSchedule';
import { getMetricWidth } from '../../metrics/selectors/getMetricWidth';
import { GraphChartNode } from '../interfaces/GraphChartNode';
import { GraphChartEdge } from '../interfaces/GraphChartEdge';
import { scaleLinear } from 'd3-scale';
import { IRootState } from '../../app/interfaces/IRootState';

@Component({
    selector: 'ssw-gc-container',
    template: `
        <ssw-block class="block">
            <div class="content" #content>
                <ssw-gc-canvas
                    [nodes]="scaledNodes"
                    [edges]="scaledEdges"
                    [height]="height"
                    [width]="width"
                    [nodeRadius]="nodeRadius"
                    [verticalDragging]="true"
                    [horizontalDragging]="false"
                ></ssw-gc-canvas>
            </div>
        </ssw-block>
    `,
    styles: [
        `
            .block {
                height: 100%;
                width: 100%;
            }

            .content {
                height: 100%;
            }
        `,
    ],
})
export class GcContainerComponent implements AfterContentInit, OnDestroy {
    public readonly nodeRadius = 15;

    @ViewChild('content') element: ElementRef;

    public height: number;
    public width: number;
    public graph: Graph;
    public scaledNodes: GraphChartNode[] = [];
    public scaledEdges: GraphChartEdge[] = [];

    private scaleX: (value: number) => number;
    private scaleY: (value: number) => number;
    private storeSubscription: Subscription;

    constructor(private readonly store: Store<IRootState>) {}

    public ngAfterContentInit(): void {
        setTimeout(() => this.getContentSize());

        this.storeSubscription = combineLatest(
            this.store.pipe(select(getGraph)),
            this.store.pipe(select(getSchedule)),
            this.store.pipe(select(getMetricWidth))
        )
            .pipe(
                filter(
                    ([graph, groups, maxGroupSize]) =>
                        Boolean(groups.length) && maxGroupSize > 0
                ),
                tap(([graph, groups, maxGroupSize]) => {
                    this.graph = graph;

                    this.calculateScalesForSchedule(
                        groups.length,
                        maxGroupSize
                    );
                    this.calculateNodeTicksForSchedule(groups, maxGroupSize);
                    this.calculateEdgeTicks();
                })
            )
            .subscribe();
    }

    @HostListener('window:resize')
    public handleResize() {
        this.getContentSize();
    }

    private getContentSize() {
        this.height = this.element.nativeElement.clientHeight;
        this.width = this.element.nativeElement.clientWidth;
    }

    private calculateScalesForSchedule(
        groupCount: number,
        maxGroupSize: number
    ) {
        this.scaleX = scaleLinear()
            .domain([0, groupCount - 1])
            .range([this.nodeRadius, this.width - this.nodeRadius * 2]);
        this.scaleY = scaleLinear()
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
                sequence.nodes.forEach((nodeId, nodeIndex) => {
                    const node = this.graph.nodes.filter(
                        item => item.id === nodeId
                    )[0];

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
                    node => node.id === edge.sourceId
                ),
                target: this.scaledNodes.find(
                    node => node.id === edge.targetId
                ),
            };
        });
    }

    public ngOnDestroy(): void {
        this.storeSubscription.unsubscribe();
    }
}
