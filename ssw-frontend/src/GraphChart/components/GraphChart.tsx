import React, { ReactNode } from 'react';
import { Line } from '../../Line';
import { DragHandler } from '../../DragHandler';
import { GraphNode } from '../../GraphNode';
import { Canvas } from '../../Canvas';
import { ArrowMarkerDefs } from '../../ArrowMarkerDefs';
import { GraphNodeType } from '../types/GraphNodeType';
import { GraphEdgeType } from '../types/GraphEdgeType';
import { LineDirection } from '../../Line/enums/LineDirection';

export type GraphChartProps = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
};

type GraphChartState = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
};

export class GraphChart extends React.PureComponent<GraphChartProps, GraphChartState> {
    static readonly defaultProps: GraphChartProps = {
        nodes: [],
        links: [],
    };

    public readonly state: GraphChartState = { nodes: this.props.nodes, links: this.props.links };

    public render(): ReactNode {
        const linkElements = this.getLinkElements();
        const nodeElements = this.getNodeElements();

        return (
            <Canvas>
                <defs>
                    <ArrowMarkerDefs offsetStartMarker={15} offsetEndMarker={15} />
                </defs>

                {linkElements}
                {nodeElements}
            </Canvas>
        );
    }

    private handleMove(event: MouseEvent, id: GraphNodeType['id']): void {
        const nodes = this.state.nodes.map(originNode =>
            originNode.id === id ? { ...originNode, x: event.clientX, y: event.clientY } : originNode
        );

        this.setState({
            nodes: nodes,
        });
    }

    private getNodeElements(): ReactNode[] {
        return this.state.nodes.map(node => (
            <DragHandler key={node.id} onMouseMove={event => this.handleMove(event, node.id)}>
                <GraphNode {...node} />
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

            return (
                <Line
                    key={link.id}
                    sourceX={sourceNode.x}
                    sourceY={sourceNode.y}
                    targetX={targetNode.x}
                    targetY={targetNode.y}
                    direction={LineDirection.FORWARD}
                />
            );
        });
    }
}
