import { GraphState } from './GraphState';
import { ScheduleState } from './ScheduleState';
import { SeparateNodesState } from './SeparateNodesState';
import { ICommonState } from './CommonState';

export interface AppState {
    commonState: ICommonState;
    graphState: GraphState;
    scheduleState: ScheduleState;
    separateNodesState: SeparateNodesState;
}
