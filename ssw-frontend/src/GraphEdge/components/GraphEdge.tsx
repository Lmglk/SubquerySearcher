import React, { ReactNode } from 'react';
import { GraphNode } from '../../GraphNode';

export type GraphEdgeProps = {
    id: number;
    source: GraphNode;
    target: GraphNode;
};

type State = {};

export class GraphEdge extends React.PureComponent<GraphEdgeProps, State> {
    public render(): ReactNode {
        return;
    }
}
