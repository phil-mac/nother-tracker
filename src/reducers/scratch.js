import {SET_SCRATCH} from '../actions/index';

const initialState = {
    scratch: {
        note: '...'
    }
}

export const scratchReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_SCRATCH: {
            return{
                ...state,
                scratch: action.payload
            }
        }
        default:
            return state;
    }
}