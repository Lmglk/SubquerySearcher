import React from 'react';
import { Block } from '../../../UIComponentsPackage/Block';

type Props = {};

type State = {};

export class ScheduleLayout extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return <Block style={{ height: '100%', width: '100%' }} />;
    }
}
