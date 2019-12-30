import {sessionReducer} from './session';
import {scratchReducer} from './scratch';
import {routineReducer} from './routine';
import {trackReducer} from './track';
import { combineReducers } from 'redux';

export const reducer = combineReducers({
    sessionState: sessionReducer,
    scratchState: scratchReducer,
    routineState: routineReducer,
    trackState: trackReducer
})

