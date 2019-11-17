import { GraphNode } from './GraphNode';

export interface Sequence {
    id: string;
    nodes: GraphNode[];
    time: number;
}
