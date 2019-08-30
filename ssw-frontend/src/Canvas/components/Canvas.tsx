import React, { ReactNode } from 'react';
import styles from './Canvas.module.css';

export type CanvasProps = {
    children: ReactNode[];
};

type CanvasState = {};

export class Canvas extends React.PureComponent<CanvasProps, CanvasState> {
    public render(): ReactNode {
        const { children } = this.props;

        return <svg className={styles.canvas}>{children}</svg>;
    }
}
