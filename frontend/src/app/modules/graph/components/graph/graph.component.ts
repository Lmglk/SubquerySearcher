import {
    Component,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { Graph } from '../../../../types/Graph';
import * as d3 from 'd3';
import { Group } from '../../../../types/Group';

interface GraphNode {
    id: string;
    name: string;
    x: number;
    y: number;
}

interface GraphEdge {
    id: string;
    source: GraphNode;
    target: GraphNode;
}

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['graph.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnChanges {
    @Input() graph: Graph;
    @Input() schedule: Group[];

    public data: any;

    private nodes: GraphNode[];
    private edges: GraphEdge[];

    private readonly offset = 50;
    private readonly nodeRadius = 15;
    private readonly nodeOffset = 15;
    private width;
    private height;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.graph || changes.schedule) {
            this.data = this.graph;
            this.redraw();
        }
    }

    @HostListener('window:resize')
    private redraw() {
        if (!this.graph) {
            return;
        }
        this.destroyGraph();
        this.renderGraph();
    }

    private renderGraph() {
        const svg = d3
            .select('#graph')
            .append('svg')
            .attr('id', 'chart')
            .attr('width', '100%')
            .attr('height', '100%');

        const defs = svg.append('defs');
        const edges = svg.append('g').attr('class', 'edges');
        const nodes = svg.append('g').attr('class', 'nodes');

        const chart = document.getElementById('chart');
        this.width = chart.clientWidth;
        this.height = chart.clientHeight;

        this.schedule
            ? this.interpolationForParallelForm()
            : this.interpolation();

        this.edges = this.graph.edges.map(edge => ({
            id: edge.id,
            source: this.nodes.find(node => node.id === edge.source.id),
            target: this.nodes.find(node => node.id === edge.target.id),
        }));

        this.renderMarkers(defs);
        this.renderNodes(nodes);
        this.renderEdges(edges);
    }

    private interpolation() {
        const r = this.height / 2 - this.offset;
        this.nodes = this.graph.nodes.map((node, index) => ({
            ...node,
            x:
                r *
                    Math.cos(
                        (2 * Math.PI * index) / this.graph.nodes.length -
                            Math.PI / 2 +
                            Math.PI
                    ) +
                this.width / 2,
            y:
                r *
                    Math.sin(
                        (2 * Math.PI * index) / this.graph.nodes.length -
                            Math.PI / 2 +
                            Math.PI
                    ) +
                this.height / 2,
        }));
    }

    private interpolationForParallelForm() {
        const maxValue = this.getSizeMaxGroup(this.schedule);
        const linearX = d3
            .scaleLinear()
            .domain([0, this.schedule.length - 1])
            .range([this.offset, this.width - this.offset]);
        const linearY = d3
            .scaleLinear()
            .domain([0, maxValue - 1])
            .range([this.offset, this.height - this.offset]);

        this.schedule.forEach((group, groupIndex) => {
            group.sequences.forEach((sequence, sequenceIndex) => {
                sequence.nodes.forEach((node, nodeIndex) => {
                    const currentNode = this.graph.nodes.find(
                        item => item.id === node.id
                    );

                    this.nodes = [
                        ...this.nodes,
                        {
                            ...currentNode,
                            x:
                                linearX(groupIndex) +
                                nodeIndex *
                                    (this.nodeRadius * 2 + this.nodeOffset),
                            y: linearY(maxValue - sequenceIndex - 1),
                        },
                    ];
                });
            });
        });
    }

    private getSizeMaxGroup(groups: Group[]) {
        return Math.max(...groups.map(group => group.sequences.length));
    }

    private renderNodes(nodes) {
        nodes
            .selectAll('g')
            .data(this.nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .call(
                d3
                    .drag()
                    .on(
                        'drag',
                        this.schedule
                            ? this.draggedForParallelForm
                            : this.dragged
                    )
            )
            .on('click', this.clickHandler)
            .append('circle')
            .attr('cx', (d: GraphNode) => d.x)
            .attr('cy', (d: GraphNode) => d.y)
            .attr('r', this.nodeRadius);

        nodes
            .selectAll('g.node')
            .data(this.nodes)
            .append('text')
            .attr('class', 'label')
            .attr('x', (d: GraphNode) => d.x)
            .attr('y', (d: GraphNode) => d.y)
            .text((d: GraphNode) => d.name);
    }

    private renderEdges(edges) {
        edges
            .selectAll('g')
            .data(this.edges)
            .enter()
            .append('line')
            .attr('class', 'edge')
            .attr('source', (d: GraphEdge) => d.source.id)
            .attr('target', (d: GraphEdge) => d.target.id)
            .attr('x1', (d: GraphEdge) => d.source.x)
            .attr('y1', (d: GraphEdge) => d.source.y)
            .attr('x2', (d: GraphEdge) => d.target.x)
            .attr('y2', (d: GraphEdge) => d.target.y)
            .attr('marker-end', 'url(#arrow_active)');
    }

    private renderMarkers(defs) {
        defs.selectAll('marker')
            .data(['arrow_active', 'arrow_inactive'])
            .enter()
            .append('marker')
            .attr('id', d => d)
            .attr('class', 'marker')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', this.nodeRadius + 5)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');
    }

    private clickHandler(d: GraphNode) {
        const node = d3.select(this);
        const isActive = node.classed('active');
        if (!isActive) {
            d3.selectAll('g.node').classed('active', false);
            GraphComponent.markAllActive();
            node.classed('active', true);
            GraphComponent.markInactive(d.id);
        } else {
            node.classed('active', false);
            GraphComponent.markAllActive();
        }
    }

    private dragged(d: GraphNode) {
        const { x, y } = d3.event;
        d3.select(this)
            .select('circle')
            .attr('cx', (d.x = x))
            .attr('cy', (d.y = y));

        d3.select(this)
            .select('text')
            .attr('x', (d.x = x))
            .attr('y', (d.y = y));

        d3.selectAll(`line[source="${d.id}"]`)
            .attr('x1', (d.x = x))
            .attr('y1', (d.y = y));

        d3.selectAll(`line[target="${d.id}"]`)
            .attr('x2', (d.x = x))
            .attr('y2', (d.y = y));
    }

    private draggedForParallelForm(d: GraphNode) {
        const { y } = d3.event;
        d3.select(this)
            .select('circle')
            .attr('cy', (d.y = y));

        d3.select(this)
            .select('text')
            .attr('y', (d.y = y));

        d3.selectAll(`line[source="${d.id}"]`).attr('y1', (d.y = y));
        d3.selectAll(`line[target="${d.id}"]`).attr('y2', (d.y = y));
    }

    private static markAllActive() {
        d3.selectAll('g.node').classed('inactive', false);

        d3.selectAll('line')
            .classed('inactive', false)
            .attr('marker-end', 'url(#arrow_active)');
    }

    private static markInactive(id: string) {
        d3.selectAll('g.node:not(.active)').classed('inactive', true);

        d3.selectAll(`line:not([source="${id}"]):not([target="${id}"])`)
            .classed('inactive', true)
            .attr('marker-end', 'url(#arrow_inactive)');
    }

    private destroyGraph() {
        this.edges = [];
        this.nodes = [];
        d3.select('#chart').remove();
    }
}
