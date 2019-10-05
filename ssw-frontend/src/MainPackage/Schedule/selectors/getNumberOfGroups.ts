import { AppState } from '../../types/AppState';

export const getNumberOfGroups = (state: AppState) => state.schedule.groups.length;
