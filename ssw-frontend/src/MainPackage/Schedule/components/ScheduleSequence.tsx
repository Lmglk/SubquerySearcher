import React from 'react';

type Props = {
    nodeNames: string[];
};

type State = {};

export class ScheduleSequence extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        const namesAsString = this.props.nodeNames.join(', ');
        return <React.Fragment>{namesAsString}</React.Fragment>;
    }
}
