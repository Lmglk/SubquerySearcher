import { GraphState } from '../store/reducers/graph.reducer';
import { ScheduleState } from '../store/reducers/schedule.reducer';

export interface AppState {
    graphState: GraphState;
    scheduleState: ScheduleState;
}
