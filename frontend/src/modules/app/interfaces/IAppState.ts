import { OptimizationMode } from '../enums/OptimizationOptions';
import { Graph } from './Graph';
import { Group } from './Group';
import { PartitionItem } from './PartitionItem';
import { IReplicationItem } from './IReplicationItem';

export interface IAppState {
    optimizationMode: OptimizationMode;
    originalGraph: Graph;
    graph: Graph;
    replicationTable: IReplicationItem[];
    schedule: Group[];
    separateNodes: PartitionItem[];
}
