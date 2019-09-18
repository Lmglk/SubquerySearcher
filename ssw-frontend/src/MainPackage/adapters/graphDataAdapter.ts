import { Graph } from '../GraphChartLayout/types/Graph';
import { GraphNode } from '../GraphChartLayout/types/GraphNode';

export type GraphAdapter = Omit<Graph, 'links'> & {
    edges: {
        id: string;
        source: GraphNode;
        target: GraphNode;
    }[];
};

export function graphDataAdapter(data: GraphAdapter) {
    return {
        nodes: data.nodes,
        links: data.edges.map((edge: any) => ({
            id: edge.id,
            sourceId: edge.source.id,
            targetId: edge.target.id,
        })),
    };
}
