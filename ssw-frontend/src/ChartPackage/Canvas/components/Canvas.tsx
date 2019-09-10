import React, { ReactNode } from 'react';

export type CanvasProps = {
    width: number;
    height: number;
    children: ReactNode;
};

type CanvasState = {};

export class Canvas extends React.PureComponent<CanvasProps, CanvasState> {
    public render(): ReactNode {
        const { width, height, children } = this.props;

        return (
            <svg width={width} height={height}>
                {children}
            </svg>
        );
    }
}
