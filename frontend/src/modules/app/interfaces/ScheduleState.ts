import { Group } from './Group';
import { Metrics } from './Metrics';

export interface ScheduleState {
    groups: Group[];
    metrics: Metrics;
}
