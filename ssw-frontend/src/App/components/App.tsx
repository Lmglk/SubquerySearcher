import React, { ReactNode } from 'react';
import { GraphChart } from '../../GraphChart';

import styles from './App.module.css';

import { graphData } from '../../GraphChart/graphData';
import { GraphData } from '../../GraphChart/types/GraphData';

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
