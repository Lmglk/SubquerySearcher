import { GraphChartNode } from './GraphChartNode';

export interface GraphChartEdge {
    id: string;
    source: GraphChartNode;
    target: GraphChartNode;
}
