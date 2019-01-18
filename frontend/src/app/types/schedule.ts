import { Group } from './Group';
import { Statistic } from './statistic';

export interface Schedule {
    groups: Group[];
    statistics: Statistic;
}
