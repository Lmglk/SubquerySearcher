import { GraphNode } from './GraphNode';

export type GraphEdge = {
    id: string;
    source: GraphNode;
    target: GraphNode;
};
