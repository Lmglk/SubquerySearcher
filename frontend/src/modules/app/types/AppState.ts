import { GraphState } from './GraphState';
import { ModifiedGraphState } from './ModifiedGraphState';
import { ScheduleState } from './ScheduleState';
import { SeparateNodesState } from './SeparateNodesState';

export interface AppState {
    graphState: GraphState;
    modifiedGraphState: ModifiedGraphState;
    scheduleState: ScheduleState;
    separateNodesState: SeparateNodesState;
}
