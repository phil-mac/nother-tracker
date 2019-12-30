import {SET_TRACK, ADD_ENTRY_TO_TRACK, DELETE_ENTRY_FROM_TRACK, EDIT_ENTRY_FIELD_IN_TRACK, EDIT_ENTRY_DATE} from '../actions/index';

const initialState = {track: []}

export const trackReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_TRACK: {
            return{
                ...state,
                track: action.payload
            }
        }
        case ADD_ENTRY_TO_TRACK: {
            return{
                ...state,
                track: [...state.track, action.payload]
            }
        }
        case DELETE_ENTRY_FROM_TRACK: {
            return{
                ...state,
                track: state.track.filter((entry, index) => (
                    index !== action.payload
                ))
            }
        }
        case EDIT_ENTRY_FIELD_IN_TRACK: {
            console.log('reducer edit', action.payload.entryId, action.payload.groupId, action.payload.itemId, action.payload.newVal);

            return{
                ...state,
                track: state.track.map((entry, entryIndex) => (
                    action.payload.entryId !== entryIndex ? entry : {
                        ...entry,
                        routine: entry.routine.map((group, groupIndex) => (
                            action.payload.groupId !== groupIndex ? group : (
                                group.map((item, itemIndex) => (
                                    action.payload.itemId !== itemIndex ? item : {
                                        ...item,
                                        input: action.payload.newVal
                                    }
                                ))
                            )
                        ))
                    }
                ))
            }
        }
        case EDIT_ENTRY_DATE: {
            return{
                ...state,
                track: state.track.map((entry, entryIndex) => (
                    action.payload.entryId !== entryIndex ? entry : {
                        ...entry,
                        date: action.payload.newDate
                    }
                ))
            }
        }
        default:
            return state;
    }
}