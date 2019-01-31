import { Group } from './Group';
import { Metrics } from './Metrics';

export interface Schedule {
    groups: Group[];
    metrics: Metrics;
}
