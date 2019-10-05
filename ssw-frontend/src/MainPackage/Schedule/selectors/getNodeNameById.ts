import { AppState } from '../../types/AppState';
import { GraphNode } from '../../GraphChartLayout/types/GraphNode';

export const getNodeNameById = (state: AppState, nodeId: GraphNode['id']) => {
    const node = state.graph.nodes.find(node => node.id === nodeId);

    return node === undefined ? '' : node.name;
};
