import React, { ReactNode } from 'react';

import { GraphChart, GraphData } from '../../../ChartPackage';

import styles from './App.module.css';
import { graphData } from './graphData';

type AppProps = {};
type AppState = {};

export class App extends React.PureComponent<AppProps, AppState> {
    private graphData: GraphData = graphData;

    public render(): ReactNode {
        this.graphData = {
            ...this.graphData,
            nodes: this.graphData.nodes.map(node => ({
                ...node,
                x: Math.random(),
                y: Math.random(),
            })),
        };

        return (
            <div className={styles.resizeBlock}>
                <GraphChart nodes={this.graphData.nodes} links={graphData.links} nodeSize={30} />
            </div>
        );
    }
}
