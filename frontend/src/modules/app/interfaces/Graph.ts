import { GraphEdge } from './GraphEdge';
import { GraphNode } from './GraphNode';

export interface Graph {
    edges: GraphEdge[];
    nodes: GraphNode[];
}
