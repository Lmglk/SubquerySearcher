import React, { ReactNode } from 'react';

import styles from './GraphNode.module.css';

export type GraphNodeProps = {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    colorLabel: string;
    name: string;
};

type State = {};

export class GraphNode extends React.PureComponent<GraphNodeProps, State> {
    static readonly defaultProps: GraphNodeProps = {
        id: 0,
        x: 0,
        y: 0,
        size: 0,
        color: '#000000',
        colorLabel: '#FFFFFF',
        name: '',
    };

    public render(): ReactNode {
        const { x, y, size, color, colorLabel, name } = this.props;

        const nodeRadius = size === 0 ? 0 : size / 2;

        return (
            <g className={styles.node}>
                <circle cx={x} cy={y} r={nodeRadius} fill={color} />
                <text className={styles.label} x={x} y={y} fill={colorLabel}>
                    {name}
                </text>
            </g>
        );
    }
}
