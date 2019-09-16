import React from 'react';

import { GraphChart, GraphEdgeType, GraphNodeType } from '../../../ChartPackage';
import { Block } from '../../../UIComponentsPackage';

import styles from './GraphChartLayout.module.css';

type Props = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
};

type State = {};

export class GraphChartLayout extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        const { nodes, links } = this.props;

        return (
            <Block style={{ height: '100%', width: '100%' }}>
                <div className={styles.grid}>
                    <GraphChart nodes={nodes} links={links} nodeSize={30} />
                </div>
            </Block>
        );
    }
}
