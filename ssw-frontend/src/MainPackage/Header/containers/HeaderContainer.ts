import { connect } from 'react-redux';
import { SetGraphAction } from '../actions/setGraphAction';

import { Header } from '..';
import { GraphData } from '../../../ChartPackage/GraphChart';

const mapDispatchToProps = (dispatch: Function) => ({
    uploadFile: (data: GraphData) => dispatch(new SetGraphAction(data)),
});

export const HeaderContainer = connect(
    null,
    mapDispatchToProps
)(Header);
