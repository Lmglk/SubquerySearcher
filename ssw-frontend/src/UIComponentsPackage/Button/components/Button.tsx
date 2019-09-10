import React, { PureComponent } from 'react';

import styles from './Button.module.css';

type ButtonStyleType = 'accent' | 'secondary' | 'tertiary';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    styletype?: ButtonStyleType;
};

type State = {};

export class Button extends PureComponent<ButtonProps, State> {
    public static readonly defaultProps: ButtonProps = {
        styletype: 'accent',
    };

    public render(): React.ReactNode {
        const { children, ...restProps } = this.props;

        return (
            <button className={styles.button} {...restProps}>
                {children}
            </button>
        );
    }
}
