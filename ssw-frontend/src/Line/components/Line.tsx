import React, { ReactNode } from 'react';
import { LineDirection } from '../enums/LineDirection';

export type LineProps = {
    id: number;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    color: string;
    strokeWidth: number;
    direction: LineDirection;
};

type LineState = {};

export class Line extends React.PureComponent<LineProps, LineState> {
    static readonly defaultProps: LineProps = {
        id: 0,
        sourceX: 0,
        sourceY: 0,
        targetX: 0,
        targetY: 0,
        color: '#000000',
        strokeWidth: 1,
        direction: LineDirection.NONE,
    };

    public render(): ReactNode {
        const { sourceX, sourceY, targetX, targetY, color, strokeWidth } = this.props;

        const showEndMarker = this.isShowEndMarker();
        const showStartMarker = this.isShowStartMarker();

        return (
            <line
                x1={sourceX}
                y1={sourceY}
                x2={targetX}
                y2={targetY}
                stroke={color}
                strokeWidth={strokeWidth}
                markerStart={showStartMarker ? 'url(#markerStart)' : ''}
                markerEnd={showEndMarker ? 'url(#markerEnd)' : ''}
            />
        );
    }

    private isShowEndMarker() {
        const { direction } = this.props;

        return direction === LineDirection.FORWARD || direction === LineDirection.BIDIRECTIONAL;
    }

    private isShowStartMarker() {
        const { direction } = this.props;

        return direction === LineDirection.BACK || direction === LineDirection.BIDIRECTIONAL;
    }
}
