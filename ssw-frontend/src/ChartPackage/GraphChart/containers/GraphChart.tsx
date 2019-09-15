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
        height: 0,
        width: 0,
    };

    private scaleX = scaleLinear();
    private scaleY = scaleLinear();
    private clampX = scaleLinear();
    private clampY = scaleLinear();

    private scaledNodes: GraphNodeType[] = [];

    public render(): ReactNode {
        const { nodes, nodeSize } = this.props;

        this.calculateScales();

        if (this.scaledNodes.length === 0) {
            this.scaledNodes = nodes.map(node => ({
                ...node,
                x: this.scaleX(node.x),
                y: this.scaleY(node.y),
            }));
        }

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
    private handleResize({ width, height }: ResizeHandlerState): void {
        this.setState({
            height: height,
            width: width,
        });
    }

    private calculateScales(): void {
        const { height, width } = this.state;
        const { nodes, nodeSize: delta } = this.props;

        const valuesX = nodes.map(node => node.x);
        const valuesY = nodes.map(node => node.y);

        const domainX = this.getMinMax(valuesX);
        const domainY = this.getMinMax(valuesY);

        this.scaleX = this.scaleX.domain(domainX).range([delta, width - delta]);
        this.scaleY = this.scaleY.domain(domainY).range([delta, height - delta]);

        this.clampX = scaleLinear()
            .domain([delta, width - delta])
            .range([delta, width - delta])
            .clamp(true);

        this.clampY = scaleLinear()
            .domain([delta, height - delta])
            .range([delta, height - delta])
            .clamp(true);
    }

    private handleMove(event: MouseEvent, id: GraphNodeType['id']): void {
        this.scaledNodes = this.scaledNodes.map(originNode =>
            originNode.id === id
                ? {
                      ...originNode,
                      x: this.clampX(event.clientX),
                      y: this.clampY(event.clientY),
                  }
                : originNode
        );

        this.forceUpdate();
    }

    private getNodeElements(): ReactNode[] {
        const { nodeSize } = this.props;

        return this.scaledNodes.map(node => (
            <DragHandler key={node.id} onMouseMove={event => this.handleMove(event, node.id)}>
                <GraphNode {...node} size={nodeSize} />
            </DragHandler>
        ));
    }

    private getLinkElements(): ReactNode[] {
        const { links } = this.props;

        return links.map(link => {
            const sourceNode = this.scaledNodes.find(node => node.id === link.sourceId);
            const targetNode = this.scaledNodes.find(node => node.id === link.targetId);

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
