import React, { ReactNode } from 'react';
import { LineDirection } from '../../Line/enums/LineDirection';
import { Line } from '../../Line';
import { Node } from '../../GraphChart/types/Node';

export type GraphEdgeProps = {
    source: Node;
    target: Node;
};

type State = {};

export class GraphEdge extends React.PureComponent<GraphEdgeProps, State> {
    public render(): ReactNode {
        const { source, target } = this.props;

        return (
            <Line
                sourceX={source.x}
                sourceY={source.y}
                targetX={target.x}
                targetY={target.y}
                direction={LineDirection.FORWARD}
            />
        );
    }
}
