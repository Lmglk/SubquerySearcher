import React, { ReactNode } from 'react';
import { DragHandler } from '../../DragHandler';
import { GraphNode } from '../../GraphNode';
import { Canvas } from '../../Canvas';
import { ArrowMarkerDefs } from '../../ArrowMarkerDefs';
import { GraphNodeType } from '../types/GraphNodeType';
import { GraphEdgeType } from '../types/GraphEdgeType';
import { GraphEdge } from '../../GraphEdge';
import { scaleLinear } from 'd3-scale';
import autobind from 'autobind-decorator';

export type GraphChartProps = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
    nodeSize: number;
};

type GraphChartState = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
};

export class GraphChart extends React.PureComponent<GraphChartProps, GraphChartState> {
    static readonly defaultProps: GraphChartProps = {
        nodes: [],
        links: [],
        nodeSize: 20,
    };

    public readonly state: GraphChartState = {
        nodes: this.props.nodes,
        links: this.props.links,
    };

    private scaleX = scaleLinear();
    private scaleY = scaleLinear();
    private canvasWidth: number = 0;
    private canvasHeight: number = 0;

    public render(): ReactNode {
        const { nodeSize } = this.props;

        const linkElements = this.getLinkElements();
        const nodeElements = this.getNodeElements();

        const delta = nodeSize / 2;

        return (
            <Canvas reference={this.reference}>
                <defs>
                    <ArrowMarkerDefs offsetStartMarker={delta} offsetEndMarker={delta} />
                </defs>

                {linkElements}
                {nodeElements}
            </Canvas>
        );
    }

    public componentDidMount(): void {
        this.scaleNodes();
    }

    @autobind
    private reference(element: SVGSVGElement | null): void {
        if (element === null) {
            throw Error('Canvas reference does not exist');
        }

        this.canvasWidth = element.clientWidth;
        this.canvasHeight = element.clientHeight;
    }

    private scaleNodes(): void {
        const { nodes } = this.state;
        const { nodeSize: delta } = this.props;

        const valuesX = nodes.map(node => node.x);
        const valuesY = nodes.map(node => node.y);

        const domainX = this.getMinMax(valuesX);
        const domainY = this.getMinMax(valuesY);

        this.scaleX = this.scaleX.domain(domainX).range([delta, this.canvasWidth - delta]);
        this.scaleY = this.scaleY.domain(domainY).range([delta, this.canvasHeight - delta]);

        const scaledNodes = nodes.map(node => ({
            ...node,
            x: this.scaleX(node.x),
            y: this.scaleY(node.y),
        }));

        this.setState({
            nodes: scaledNodes,
        });
    }

    private handleMove(event: MouseEvent, id: GraphNodeType['id']): void {
        const { nodeSize } = this.props;

        const delta = nodeSize / 2;

        const clampX = scaleLinear()
            .domain([delta, this.canvasWidth - delta])
            .range([delta, this.canvasWidth - delta])
            .clamp(true);

        const clampY = scaleLinear()
            .domain([delta, this.canvasHeight - delta])
            .range([delta, this.canvasHeight - delta])
            .clamp(true);

        const nodes = this.state.nodes.map(originNode =>
            originNode.id === id
                ? {
                      ...originNode,
                      x: clampX(event.clientX),
                      y: clampY(event.clientY),
                  }
                : originNode
        );

        this.setState({
            nodes: nodes,
        });
    }

    private getNodeElements(): ReactNode[] {
        const { nodeSize } = this.props;

        return this.state.nodes.map(node => (
            <DragHandler key={node.id} onMouseMove={event => this.handleMove(event, node.id)}>
                <GraphNode {...node} size={nodeSize} />
            </DragHandler>
        ));
    }

    private getLinkElements(): ReactNode[] {
        const { nodes, links } = this.state;

        return links.map(link => {
            const sourceNode = nodes.find(node => node.id === link.sourceId);
            const targetNode = nodes.find(node => node.id === link.targetId);

            if (sourceNode == null || targetNode == null) {
                throw Error('Node does not exist');
            }

            return <GraphEdge key={link.id} source={sourceNode} target={targetNode} />;
        });
    }

    private getMinMax(series: number[]): [number, number] {
        return series.reduce(
            (acc, prev) => {
                const min = Math.min(acc[0], prev);
                const max = Math.max(acc[1], prev);
                return [min, max];
            },
            [Infinity, -Infinity]
        );
    }
}
