import { GraphNode } from './GraphNode';
import { GraphLink } from './GraphLink';

export type Graph = {
    nodes: GraphNode[];
    links: GraphLink[];
};
