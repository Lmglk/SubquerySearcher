import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { Layout } from '../../Layout';
import { store } from '../../store';

type AppProps = {};
type AppState = {};

export class App extends React.PureComponent<AppProps, AppState> {
    public render(): ReactNode {
        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}
