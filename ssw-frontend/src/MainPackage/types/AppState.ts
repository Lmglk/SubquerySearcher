import { GraphState } from './GraphState';
import { ScheduleState } from './ScheduleState';

export type AppState = {
    graph: GraphState;
    schedule: ScheduleState;
};
