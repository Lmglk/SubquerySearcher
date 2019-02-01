import { GraphState } from '../store/reducers/graph.reducer';
import { ScheduleState } from '../store/reducers/schedule.reducer';
import { SeparateNodesState } from '../store/reducers/separate-nodes.reducer';

export interface AppState {
    graphState: GraphState;
    scheduleState: ScheduleState;
    separateNodesState: SeparateNodesState;
}
