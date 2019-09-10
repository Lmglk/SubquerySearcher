import React from 'react';

import styles from './Checkbox.module.css';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

type State = {};

export class Checkbox extends React.PureComponent<CheckboxProps, State> {
    public render(): React.ReactNode {
        const { checked, disabled, ...restProps } = this.props;

        return (
            <div className={styles.checkboxContainer}>
                <label
                    className={`${styles.checkboxLabel} ${checked ? styles.checked : ''} ${
                        disabled ? styles.disabled : ''
                    }`}
                >
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        {...restProps}
                    />
                </label>
            </div>
        );
    }
}
