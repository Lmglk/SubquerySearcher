import React from 'react';

import { Block } from '../../../UIComponentsPackage';
import { GraphChart, GraphData } from '../../../ChartPackage';

import styles from './GraphChartLayout.module.css';
import { graphData } from './graphData';

type Props = {};

type State = {};

export class GraphChartLayout extends React.PureComponent<Props, State> {
    private graphData: GraphData = graphData;

    public render(): React.ReactNode {
        this.graphData = {
            ...this.graphData,
            nodes: this.graphData.nodes.map(node => ({
                ...node,
                x: Math.random(),
                y: Math.random(),
            })),
        };

        return (
            <Block style={{ height: '100%', width: '100%' }}>
                <div className={styles.grid}>
                    <GraphChart nodes={this.graphData.nodes} links={graphData.links} nodeSize={30} />
                </div>
            </Block>
        );
    }
}
