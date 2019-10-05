import { AppState } from '../../types/AppState';

export const getGroupByIndex = (state: AppState, index: number) => state.schedule.groups[index];
