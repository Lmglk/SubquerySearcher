import { combineReducers } from 'redux';
import graphReducer from './graphReducer';
import { scheduleReducer } from './scheduleReducer';

export const rootReducer = combineReducers({
    graph: graphReducer,
    schedule: scheduleReducer,
});
