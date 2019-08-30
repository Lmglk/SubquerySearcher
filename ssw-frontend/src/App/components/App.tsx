import React, { ReactNode } from 'react';
import { GraphChart } from '../../GraphChart';

import './App.css';

import { graphData } from '../../GraphChart/graphData';

type AppProps = {};
type AppState = {};

export class App extends React.PureComponent<AppProps, AppState> {
    public render(): ReactNode {
        return <GraphChart nodes={graphData.nodes} links={graphData.links} />;
    }
}
