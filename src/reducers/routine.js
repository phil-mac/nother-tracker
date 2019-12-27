import {SET_ROUTINE} from '../actions/index';

const initialState = {
    routine: 
    [
        [
            {
                name: 'sleep',
                val: 1030
            },
            {
                name: 'wake up',
                val: 630
            }
        ],
        [
            {
                name: 'this',
                val: 2
            },
            {
                name: 'that',
                val: 4
            },
            {
                name: 'the other thing',
                val: 6
            }
        ]
    ]
}

export const routineReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ROUTINE: {
            return{
                ...state,
                routine: [...state.routine, action.payload]
            }
        }
        default:
            return state;
    }
}