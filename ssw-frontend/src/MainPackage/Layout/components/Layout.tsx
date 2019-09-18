import React from 'react';

import { ColorScheme } from '../../../UIComponentsPackage/ColorScheme';
import { GraphChartContainer } from '../../GraphChartLayout/containers/GraphChartContainer';
import { NodesLayout } from '../../NodesLayout';
import { ScheduleLayout } from '../../ScheduleLayout';
import { MetricsLayout } from '../../MetricsLayout';
import HeaderContainer from '../../Header/containers/HeaderContainer';

import styles from './Layout.module.css';

type Props = {};

type State = {};

export class Layout extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return (
            <ColorScheme>
                <div className={styles.grid}>
                    <div className={styles.header}>
                        <HeaderContainer />
                    </div>
                    <div className={styles.chart}>
                        <GraphChartContainer />
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
