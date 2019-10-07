import React from 'react';
import { GraphNode } from '../../GraphChartLayout/types/GraphNode';
import { AppState } from '../../types/AppState';
import { connect } from 'react-redux';
import { getNodeNameById } from '../selectors/getNodeNameById';
import { ScheduleSequence } from '../components/ScheduleSequence';

type Props = {
    nodeIds: GraphNode['id'][];
    nodeNames: string[];
};

type State = {};

class ScheduleSequenceContainer extends React.PureComponent<Props, State> {
    static readonly defaultProps = {
        nodeNames: [],
    };

    public render(): React.ReactNode {
        return <ScheduleSequence nodeNames={this.props.nodeNames} />;
    }
}

const mapStateToProps = (state: AppState, props: Props) => ({
    ...props,
    nodeNames: props.nodeIds.map(nodeId => getNodeNameById(state, nodeId)),
});

export default connect(mapStateToProps)(ScheduleSequenceContainer);
