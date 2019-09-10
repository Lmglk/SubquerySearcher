import React, { ReactNode } from 'react';
import styles from './Input.module.css';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    icon?: ReactNode;
};

type State = {};

export class Input extends React.PureComponent<InputProps, State> {
    public render(): React.ReactNode {
        const { label, icon, ...restProps } = this.props;

        const iconElement = this.getIconElement();
        const labelElement = this.getLabelElement();

        return (
            <div className={styles.container}>
                {labelElement}
                <div className={styles.inputContainer}>
                    <input className={styles.input} {...restProps} />
                    {iconElement}
                </div>
            </div>
        );
    }

    private getIconElement(): React.ReactNode {
        const { icon } = this.props;

        return icon ? <div className={styles.icon}>{icon}</div> : null;
    }

    private getLabelElement(): React.ReactNode {
        const { label } = this.props;

        return label ? <div className={styles.label}>{label}</div> : null;
    }
}
