import React, { ReactNode, SVGProps } from 'react';
import { LineDirection } from '../../Line/enums/LineDirection';

type PathProps = SVGProps<SVGPathElement> & {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    direction: LineDirection;
};

type PathState = {};

export class Path extends React.PureComponent<PathProps, PathState> {
    static readonly defaultProps = {
        direction: LineDirection.NONE,
        fill: 'none',
        stroke: '#000000',
    };

    public render(): ReactNode {
        const { direction, sourceX, sourceY, targetX, targetY, ...attributes } = this.props;

        const showEndMarker = this.isShowEndMarker();
        const showStartMarker = this.isShowStartMarker();
        const path = this.getPath();

        return (
            <path
                {...attributes}
                d={path}
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

    private getPath(): string {
        const { sourceX, sourceY, targetX, targetY } = this.props;

        const dx = targetX - sourceX;
        const dy = targetY - sourceY;
        const dr = Math.sqrt(dx * dx + dy * dy);

        return 'M' + sourceX + ',' + sourceY + 'A' + dr + ',' + dr + ' 0 0,1 ' + targetX + ',' + targetY;
    }
}
