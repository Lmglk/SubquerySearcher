import React, { ReactElement, ReactNode } from 'react';
import autobind from 'autobind-decorator';

export type DragHandlerProps = {
    children: ReactElement;
    onMouseMove: (event: MouseEvent) => void;
};

type DragHandlerState = {};

export class DragHandler extends React.PureComponent<DragHandlerProps, DragHandlerState> {
    public render(): ReactNode {
        const { children } = this.props;

        return <g onMouseDown={this.handleMouseDown}>{children}</g>;
    }

    @autobind
    private handleMouseDown() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    @autobind
    private handleMouseMove(event: MouseEvent) {
        this.props.onMouseMove(event);
    }

    @autobind
    private handleMouseUp() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
}
