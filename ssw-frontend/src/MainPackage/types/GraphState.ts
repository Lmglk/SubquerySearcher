import { GraphEdgeType, GraphNodeType } from '../../ChartPackage/GraphChart';

export type GraphState = {
    nodes: GraphNodeType[];
    links: GraphEdgeType[];
};
