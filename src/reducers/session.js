import {SET_AUTH_USER} from '../actions/index';

const initialState = {
    authUser: null
}

export const sessionReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_AUTH_USER: {
            return{
                ...state,
                authUser: action.payload
            }
        }
        default:
            return state;
    }
}