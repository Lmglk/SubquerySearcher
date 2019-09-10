import React from 'react';

import styles from './List.module.css';

export type ListProps = {
    children: React.ReactNode;
};

type State = {};

export class List extends React.PureComponent<ListProps, State> {
    public render(): React.ReactNode {
        const { children } = this.props;

        return <ul className={styles.list}>{children}</ul>;
    }
}
