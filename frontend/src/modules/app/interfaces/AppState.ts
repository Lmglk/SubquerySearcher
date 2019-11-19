import { GraphState } from './GraphState';
import { ScheduleState } from './ScheduleState';
import { SeparateNodesState } from './SeparateNodesState';

export interface AppState {
    graphState: GraphState;
    scheduleState: ScheduleState;
    separateNodesState: SeparateNodesState;
}
