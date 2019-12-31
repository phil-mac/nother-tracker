import {SET_ROUTINE, ADD_GROUP_TO_ROUTINE, DELETE_GROUP_FROM_ROUTINE, REORDER_GROUP_IN_ROUTINE} from '../actions/index';

const initialState = {routine: []}

export const routineReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ROUTINE: {
            return{
                ...state,
                routine: action.payload
            }
        }
        // case ADD_GROUP_TO_ROUTINE: {
        //     return{
        //         ...state,
        //         routine: [...state.routine, action.payload]
        //     }
        // }
        // case DELETE_GROUP_FROM_ROUTINE: {
        //     return{
        //         ...state,
        //         routine: state.routine.filter((group, index) => (
        //             index !== action.payload
        //         ))
        //     }
        // }
        // case REORDER_GROUP_IN_ROUTINE: {
        //     const i = action.payload.groupId;
        //     const j = i - 1;
        //     if (j < 0) j = 0;

        //     const reorderedArray = [...state.routine];
        //     [reorderedArray[j], reorderedArray[i]] = [reorderedArray[i], reorderedArray[j]];

        //     return{
        //         ...state,
        //         routine: reorderedArray
        //     }
        // }
        default:
            return state;
    }
}