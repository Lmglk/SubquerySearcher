import React from 'react';

import styles from './Block.module.css';

export type BlockProps = React.HTMLAttributes<HTMLElement>;

type State = {};

export class Block extends React.PureComponent<BlockProps, State> {
    public render(): React.ReactNode {
        const { children, ...restProps } = this.props;

        return (
            <div className={styles.block} {...restProps}>
                {children}
            </div>
        );
    }
}
