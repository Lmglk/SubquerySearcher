import { AppState } from '../../types/AppState';

export const getMaxNumberOfSequences = (state: AppState) => {
    const numberOfSequences = state.schedule.groups.map(group => group.sequences.length);

    return Math.max(...numberOfSequences);
};
