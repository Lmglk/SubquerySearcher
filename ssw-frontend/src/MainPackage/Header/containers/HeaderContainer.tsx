import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { Header } from '../components/Header';
import { SetGraphAction } from '../actions/setGraphAction';
import { Graph } from '../../GraphChartLayout/types/Graph';
import { graphDataAdapter } from '../../adapters/graphDataAdapter';

type Props = {
    setGraph: (data: Graph) => void;
};

type State = {};

class HeaderContainer extends React.PureComponent<Props, State> {
    public render(): React.ReactNode {
        return <Header uploadFile={this.uploadFile} />;
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
        const graphData = graphDataAdapter(data);

        setGraph(graphData);
    }
}

const mapDispatchToProps = (dispatch: Function) => ({
    setGraph: (data: Graph) => dispatch(new SetGraphAction(data)),
});

export default connect(
    null,
    mapDispatchToProps
)(HeaderContainer);
