import React from 'react';

import { Block } from '../../../UIComponentsPackage/Block';

import styles from './Header.module.css';

type Props = {};

type State = {};

export class Header extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return (
            <Block>
                <div className={styles.grid} />
            </Block>
        );
    }
}
