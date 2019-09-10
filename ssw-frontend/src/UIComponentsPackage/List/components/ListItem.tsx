import React from 'react';

import styles from './ListItem.module.css';
import { classList } from '../../common/classList';

export type ListItemProps = {
    label: string;
    value: string | number;
    active: boolean;
    onSelect?: (value: string | number) => void;
};

type State = {};

export class ListItem extends React.PureComponent<ListItemProps, State> {
    static readonly defaultProps: ListItemProps = {
        label: '',
        value: '',
        active: false,
    };

    public render(): React.ReactNode {
        const { label, value, active, onSelect } = this.props;

        return (
            <li
                className={classList({
                    [styles.item]: true,
                    [styles.active]: active,
                })}
                onClick={() => onSelect && onSelect(value)}
            >
                {label}
            </li>
        );
    }
}
