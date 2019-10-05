import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Header } from '../components/Header';
import { SetGraphAction } from '../actions/SetGraphAction';
import { Graph } from '../../GraphChartLayout/types/Graph';
import { AppState } from '../../types/AppState';
import { getFreeGraph } from '../../GraphChartLayout/selectors/getFreeGraph';
import { GraphNode } from '../../GraphChartLayout/types/GraphNode';
import { GraphLink } from '../../GraphChartLayout/types/GraphLink';
import { responseGraphDataAdapter } from '../../adapters/responseGraphDataAdapter';
import { requestGraphDataAdapter } from '../../adapters/requestGraphDataAdapter';
import { SetScheduleAction } from '../actions/SetScheduleAction';
import { Group } from '../../types/Group';
import { responseGroupsAdapter } from '../../adapters/responseGroupsAdapter';

type Props = {
    setGraph: (data: Graph) => void;
    setSchedule: (data: any) => void;
    nodes: GraphNode[];
    links: GraphLink[];
};

type State = {};

class HeaderContainer extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return <Header uploadFile={this.uploadFile} calculateGraph={this.calculateGraph} />;
    }

    @autobind
    private async uploadFile(file: File): Promise<void> {
        const { setGraph } = this.props;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/graph/loadGraph', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        const graphData = responseGraphDataAdapter(data);

        setGraph(graphData);
    }

    @autobind
    private async calculateGraph(): Promise<void> {
        const { nodes: originalNodes, links: originalLinks, setSchedule } = this.props;

        const { nodes, edges } = requestGraphDataAdapter(originalNodes, originalLinks);

        const response = await fetch('http://localhost:8080/api/graph/getSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nodes: nodes,
                edges: edges,
            }),
        });

        const data = await response.json();

        const { groups: originGroups } = data;

        const groups = responseGroupsAdapter(originGroups);
        setSchedule(groups);
    }
}

const mapStateToProps = (state: AppState) => getFreeGraph(state);

const mapDispatchToProps = (dispatch: Function) => ({
    setGraph: (data: Graph) => dispatch(new SetGraphAction(data)),
    setSchedule: (data: Group[]) => dispatch(new SetScheduleAction(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);
