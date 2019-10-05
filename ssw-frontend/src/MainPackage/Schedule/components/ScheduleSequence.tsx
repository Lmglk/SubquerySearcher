import React from 'react';
import { GraphNode } from '../../GraphChartLayout/types/GraphNode';

type Props = {
    nodeNames: GraphNode['name'][];
};

type State = {};

export class ScheduleSequence extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        const namesAsString = this.props.nodeNames.join(', ');
        return <div>{namesAsString}</div>;
    }
}
