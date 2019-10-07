import { GraphNode } from '../GraphChartLayout/types/GraphNode';
import { GraphLink } from '../GraphChartLayout/types/GraphLink';

export type GraphState = {
    nodes: GraphNode[];
    links: GraphLink[];
};
