import {sessionReducer} from './session';
import {scratchReducer} from './scratch';
import { combineReducers } from 'redux';

export const reducer = combineReducers({
    sessionState: sessionReducer,
    scratchState: scratchReducer
})

