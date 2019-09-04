import React, { ReactNode } from 'react';
import { LineDirection } from '../../Line/enums/LineDirection';
import { Line } from '../../Line';
import { GraphNodeType } from '../../GraphChart/types/GraphNodeType';

export type GraphEdgeProps = {
    source: GraphNodeType;
    target: GraphNodeType;
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
