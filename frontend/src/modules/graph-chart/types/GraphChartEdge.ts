import { GraphChartNode } from './GraphChartNode';

export interface GraphChartEdge {
    id: string;
    source: GraphChartNode | undefined;
    target: GraphChartNode | undefined;
}
