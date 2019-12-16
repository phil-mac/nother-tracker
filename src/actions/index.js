export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_SCRATCH = 'SET_SCRATCH';

export const setAuthUser = authUser => {
    return{
        type: SET_AUTH_USER,
        payload: authUser
    }
}

export const setScratch = scratch => {
    return{
        type: SET_SCRATCH,
        payload: scratch
    }
}