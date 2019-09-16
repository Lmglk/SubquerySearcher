import { connect } from 'react-redux';
import { AppState } from '../../types/AppState';
import { GraphChartLayout } from '..';
import { getFreeGraph } from '../selectors/getFreeGraph';

const mapStateToProps = (state: AppState) => getFreeGraph(state);

export const GraphChartContainer = connect(mapStateToProps)(GraphChartLayout);
