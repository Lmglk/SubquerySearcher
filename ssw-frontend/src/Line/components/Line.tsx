import React, { ReactNode, SVGProps } from 'react';
import { LineDirection } from '../enums/LineDirection';

export type LineProps = SVGProps<SVGLineElement> & {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    direction: LineDirection;
};

type LineState = {};

export class Line extends React.PureComponent<LineProps, LineState> {
    static readonly defaultProps: LineProps = {
        sourceX: 0,
        sourceY: 0,
        targetX: 0,
        targetY: 0,
        stroke: '#000000',
        strokeWidth: 1,
        direction: LineDirection.NONE,
    };

    public render(): ReactNode {
        const { sourceX, sourceY, targetX, targetY, direction, ...attributes } = this.props;

        const showEndMarker = this.isShowEndMarker();
        const showStartMarker = this.isShowStartMarker();

        return (
            <line
                x1={sourceX}
                y1={sourceY}
                x2={targetX}
                y2={targetY}
                markerStart={showStartMarker ? 'url(#markerStart)' : ''}
                markerEnd={showEndMarker ? 'url(#markerEnd)' : ''}
                {...attributes}
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
