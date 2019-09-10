import React, { ReactNode } from 'react';
import { scaleLinear } from 'd3-scale';
import autobind from 'autobind-decorator';

import { DragHandler } from '../../DragHandler';
import { GraphNode } from '../../GraphNode';
import { Canvas } from '../../Canvas';
import { ArrowMarkerDefs } from '../../ArrowMarkerDefs';
import { GraphNodeType } from '../types/GraphNodeType';
import { GraphEdgeType } from '../types/GraphEdgeType';
import { GraphEdge } from '../../GraphEdge';
import { ResizeHandler, ResizeHandlerState } from '../../ResizeHandler';

export type GraphChartProps = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
    nodeSize: number;
};

type GraphChartState = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
    height: number;
    width: number;
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
        height: 0,
        width: 0,
    };

    private scaleX = scaleLinear();
    private scaleY = scaleLinear();

    public render(): ReactNode {
        const { nodeSize } = this.props;

        const linkElements = this.getLinkElements();
        const nodeElements = this.getNodeElements();

        const delta = nodeSize / 2;

        return (
            <ResizeHandler onResize={this.handleResize}>
                {({ height, width }) => (
                    <Canvas width={width} height={height}>
                        <defs>
                            <ArrowMarkerDefs offsetStartMarker={delta} offsetEndMarker={delta} />
                        </defs>

                        {linkElements}
                        {nodeElements}
                    </Canvas>
                )}
            </ResizeHandler>
        );
    }

    @autobind
    private handleResize({ width, height }: ResizeHandlerState) {
        this.setState({
            height: height,
            width: width,
        });

        this.scaleNodes();
    }

    private scaleNodes(): void {
        const { nodes, height, width } = this.state;
        const { nodeSize: delta } = this.props;

        const valuesX = nodes.map(node => node.x);
        const valuesY = nodes.map(node => node.y);

        const domainX = this.getMinMax(valuesX);
        const domainY = this.getMinMax(valuesY);

        this.scaleX = this.scaleX.domain(domainX).range([delta, width - delta]);
        this.scaleY = this.scaleY.domain(domainY).range([delta, height - delta]);

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
        const { height, width } = this.state;

        const delta = nodeSize / 2;

        const clampX = scaleLinear()
            .domain([delta, width - delta])
            .range([delta, width - delta])
            .clamp(true);

        const clampY = scaleLinear()
            .domain([delta, height - delta])
            .range([delta, height - delta])
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
