import React, { ReactNode } from 'react';

import { Layout } from '../../Layout';

type AppProps = {};
type AppState = {};

export class App extends React.PureComponent<AppProps, AppState> {
    public render(): ReactNode {
        return <Layout />;
    }
}
