import { GraphNodeType } from './GraphNodeType';
import { GraphEdgeType } from './GraphEdgeType';

export type GraphData = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
};
