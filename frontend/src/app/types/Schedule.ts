import { Group } from './Group';
import { Statistic } from './Statistic';

export interface Schedule {
    groups: Group[];
    statistic: Statistic;
}
