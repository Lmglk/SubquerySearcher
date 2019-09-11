import React from 'react';

import { Header } from '../../Header';
import { ColorScheme } from '../../../UIComponentsPackage/ColorScheme';
import { GraphChartLayout } from '../../GraphChartLayout';
import { NodesLayout } from '../../NodesLayout';
import { ScheduleLayout } from '../../ScheduleLayout';

import styles from './Layout.module.css';
import { MetricsLayout } from '../../MetricsLayout';

type Props = {};

type State = {};

export class Layout extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return (
            <ColorScheme>
                <div className={styles.grid}>
                    <div className={styles.header}>
                        <Header />
                    </div>
                    <div className={styles.chart}>
                        <GraphChartLayout />
                    </div>
                    <div className={styles.nodes}>
                        <NodesLayout />
                    </div>
                    <div className={styles.schedule}>
                        <ScheduleLayout />
                    </div>
                    <div className={styles.metrics}>
                        <MetricsLayout />
                    </div>
                </div>
            </ColorScheme>
        );
    }
}
