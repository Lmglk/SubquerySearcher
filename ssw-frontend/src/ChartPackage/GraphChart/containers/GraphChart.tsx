import React, { ReactNode } from 'react';
import { scaleLinear } from 'd3-scale';
import autobind from 'autobind-decorator';

import { DragHandler } from '../../DragHandler';
import { GraphNode } from '../../GraphNode';
import { Canvas } from '../../Canvas';
import { ArrowMarkerDefs } from '../../ArrowMarkerDefs';
import { Node } from '../types/Node';
import { Link } from '../types/Link';
import { GraphEdge } from '../../GraphEdge';
import { ResizeHandler, ResizeHandlerState } from '../../ResizeHandler';

export type GraphChartProps = {
    nodes: Node[];
    links: Link[];
    nodeSize: number;
};

type GraphChartState = {
    height: number;
    width: number;
    scaledNodes: Node[];
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
        scaledNodes: [],
    };

    private scaleX = scaleLinear();
    private scaleY = scaleLinear();
    private clampX = scaleLinear();
    private clampY = scaleLinear();

    public componentDidUpdate(prevProps: Readonly<GraphChartProps>, prevState: Readonly<GraphChartState>): void {
        const { nodes } = this.props;

        if (
            this.props !== prevProps ||
            this.state.height !== prevState.height ||
            this.state.width !== prevState.width
        ) {
            this.calculateScales();

            const scaledNodes = nodes.map(node => ({
                ...node,
                x: this.scaleX(node.x),
                y: this.scaleY(node.y),
            }));

            this.setState({
                scaledNodes: scaledNodes,
            });
        }
    }

    public render(): ReactNode {
        const { nodeSize } = this.props;

        const nodeElements = this.getNodeElements();
        const linkElements = this.getLinkElements();

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

    private handleMove(event: MouseEvent, id: Node['id']): void {
        const { scaledNodes } = this.state;

        const nodes = scaledNodes.map(originNode =>
            originNode.id === id
                ? {
                      ...originNode,
                      x: this.clampX(event.clientX),
                      y: this.clampY(event.clientY),
                  }
                : originNode
        );

        this.setState({
            scaledNodes: nodes,
        });
    }

    private getNodeElements(): ReactNode[] | null {
        const { nodeSize } = this.props;
        const { scaledNodes } = this.state;

        if (scaledNodes.length === 0) {
            return null;
        }

        return scaledNodes.map(node => (
            <DragHandler key={node.id} onMouseMove={event => this.handleMove(event, node.id)}>
                <GraphNode {...node} size={nodeSize} />
            </DragHandler>
        ));
    }

    private getLinkElements(): ReactNode[] | null {
        const { links } = this.props;
        const { scaledNodes } = this.state;

        if (scaledNodes.length === 0) {
            return null;
        }

        return links.map(link => {
            const sourceNode = scaledNodes.find(node => node.id === link.sourceId);
            const targetNode = scaledNodes.find(node => node.id === link.targetId);

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
