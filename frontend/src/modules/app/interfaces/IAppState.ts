import { OptimizationMode } from '../enums/OptimizationOptions';
import { Graph } from './Graph';
import { Group } from './Group';
import { PartitionItem } from './PartitionItem';

export interface IAppState {
    optimizationMode: OptimizationMode;
    originalGraph: Graph;
    graph: Graph;
    groups: Group[];
    separateNodes: PartitionItem[];
}
