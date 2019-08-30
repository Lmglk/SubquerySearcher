import React, { ReactNode } from 'react';
import { Line } from '../../Line';
import { DragHandler } from '../../DragHandler';
import { Node } from '../../Node';
import { Canvas } from '../../Canvas';
import { ArrowMarkerDefs } from '../../ArrowMarkerDefs';
import { GraphNode } from '../types/GraphNode';
import { GraphLink } from '../types/GraphLink';

export type GraphChartProps = {
    nodes: GraphNode[];
    links: GraphLink[];
};

type GraphChartState = {
    nodes: GraphNode[];
    links: GraphLink[];
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

    private handleMove(event: MouseEvent, id: GraphNode['id']): void {
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
                <Node {...node} />
            </DragHandler>
        ));
    }

    private getLinkElements(): ReactNode[] {
        return this.state.links.map(link => <Line key={link.id} {...link} />);
    }
}
