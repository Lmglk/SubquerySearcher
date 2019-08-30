import React, { ReactNode } from 'react';

import styles from './Node.module.css';

export type NodeProps = {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    colorLabel: string;
    label: string;
};

type State = {};

export class Node extends React.PureComponent<NodeProps, State> {
    static readonly defaultProps: NodeProps = {
        id: 0,
        x: 0,
        y: 0,
        radius: 0,
        color: '#000000',
        colorLabel: '#FFFFFF',
        label: '',
    };

    public render(): ReactNode {
        const { x, y, radius, color, colorLabel, label } = this.props;

        return (
            <g className={styles.node}>
                <circle className={styles.marker} cx={x} cy={y} r={radius} fill={color} />
                <text className={styles.label} x={x} y={y} fill={colorLabel}>
                    {label}
                </text>
            </g>
        );
    }
}
