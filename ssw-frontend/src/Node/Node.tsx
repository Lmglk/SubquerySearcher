import React from 'react';

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

export function Node(props: NodeProps) {
    const { x, y, radius, color, colorLabel, label } = props;

    return (
        <g className={styles.node}>
            <circle
                className={styles.marker}
                cx={x}
                cy={y}
                r={radius}
                fill={color}
            />
            <text className={styles.label} x={x} y={y} fill={colorLabel}>
                {label}
            </text>
        </g>
    );
}

Node.defaultProps = {
    x: 0,
    y: 0,
    radius: 0,
    color: '#000000',
    colorLabel: '#FFFFFF',
    label: '',
};
