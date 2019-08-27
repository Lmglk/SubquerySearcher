import React from 'react';
import styles from './Canvas.module.css';

export function Canvas(props: any) {
    const { children } = props;

    return <svg className={styles.canvas}>{children}</svg>;
}
