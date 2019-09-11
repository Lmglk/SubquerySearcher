import React from 'react';

import { Block } from '../../../UIComponentsPackage';

type Props = {};

type State = {};

export class NodesLayout extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return <Block style={{ height: '100%', width: '100%' }} />;
    }
}
