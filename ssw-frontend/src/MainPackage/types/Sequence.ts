import { GraphNode } from '../GraphChartLayout/types/GraphNode';

export type Sequence = {
    id: string;
    nodes: GraphNode['id'][];
    time: number;
};
