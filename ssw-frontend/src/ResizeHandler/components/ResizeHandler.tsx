import React, { ReactNode } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import autobind from 'autobind-decorator';

export type ResizeHandlerProps = {
    children: (params: ResizeHandlerState) => ReactNode;
    onResize?: (params: ResizeHandlerState) => void;
};

export type ResizeHandlerState = {
    height: number;
    width: number;
};

export class ResizeHandler extends React.PureComponent<ResizeHandlerProps, ResizeHandlerState> {
    public readonly state = {
        height: 0,
        width: 0,
    };

    private resizeObserver = new ResizeObserver(this.handleResize);

    public render(): ReactNode {
        const { children } = this.props;

        return (
            <div ref={this.reference} style={{ width: '100%', height: '100%' }}>
                {children(this.state)}
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.resizeObserver.disconnect();
    }

    @autobind
    private reference(element: HTMLDivElement | null) {
        if (element == null) {
            throw Error('Element reference does not exist');
        }

        this.resizeObserver.observe(element);
    }

    @autobind
    private handleResize(entries: ResizeObserverEntry[]) {
        const entry = entries[0];

        const { height, width } = entry.contentRect;

        this.setState({
            height: height,
            width: width,
        });

        if (this.props.onResize) {
            this.props.onResize(this.state);
        }
    }
}
