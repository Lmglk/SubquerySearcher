import React, { ReactNode } from 'react';
import styles from './Canvas.module.css';

export type CanvasProps = {
    children: ReactNode[];
    reference?: (element: SVGSVGElement | null) => void;
};

type CanvasState = {};

export class Canvas extends React.PureComponent<CanvasProps, CanvasState> {
    public render(): ReactNode {
        const { children, reference } = this.props;

        return (
            <svg className={styles.canvas} ref={reference}>
                {children}
            </svg>
        );
    }
}
