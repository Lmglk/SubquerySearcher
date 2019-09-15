import { AppState } from '../../types/AppState';

export const getFreeGraph = (state: AppState) => ({
    nodes: state.graph.nodes.map(node => ({
        ...node,
        x: Math.random(),
        y: Math.random(),
    })),
    links: state.graph.links,
});
