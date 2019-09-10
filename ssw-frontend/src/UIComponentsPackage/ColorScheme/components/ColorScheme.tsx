import React, { ReactNode } from 'react';

import styles from './ColorScheme.module.css';
import { classList } from '../../common/classList';

type Props = {
    children?: ReactNode;
};

type State = {};

export class ColorScheme extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        const { children } = this.props;

        return (
            <div
                className={classList({
                    [styles.colorScheme]: true,
                    [styles.blue]: true,
                })}
            >
                {children}
            </div>
        );
    }
}
