// export * from './authActions'
// export * from './postsActions'
// export * from './userActions'

import {database, auth, googleProvider} from '../firebase';

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_SCRATCH = 'SET_SCRATCH';

export const SET_ROUTINE = 'SET_ROUTINE';
export const ADD_GROUP_TO_ROUTINE = 'ADD_GROUP_TO_ROUTINE';
export const DELETE_GROUP_FROM_ROUTINE = 'DELETE_GROUP_FROM_ROUTINE';
export const REORDER_GROUP_IN_ROUTINE = 'REORDER_GROUP_IN_ROUTINE';

export const SET_TRACK = 'SET_TRACK';
export const ADD_ENTRY_TO_TRACK = 'ADD_ENTRY_TO_TRACK';
export const DELETE_ENTRY_FROM_TRACK = 'DELETE_ENTRY_FROM_TRACK';
export const EDIT_ENTRY_FIELD_IN_TRACK = 'EDIT_ENTRY_FIELD_IN_TRACK';
export const EDIT_ENTRY_DATE = 'EDIT_ENTRY_DATE';

export const fetchAuthUser = () => dispatch => {
    auth.onAuthStateChanged(user => {
        if (user){
            const id = user.uid;
            dispatch(setAuthUser(id))
            dispatch(fetchScratch(id))
            dispatch(fetchRoutine(id))
            dispatch(fetchTrack(id))
        } else{
            dispatch(setAuthUser(null));
        }
    })
}

export const setAuthUser = authUser => {
    return{
        type: SET_AUTH_USER,
        payload: authUser
    }
}

export const setScratch = (scratch, authUser) => dispatch =>{
    database
      .ref(`scratchTest/${authUser}`)
      .set(scratch);
}

export const fetchScratch = authUserNew => dispatch => {
    database
      .ref(`scratchTest/${authUserNew}`)
      .on("value", snapshot => {
        const val = snapshot.val();
        if(val){
          dispatch(storeScratch(val));
        }else{
          dispatch(storeScratch('Write things, theyll save as you go.'))
        }
      });
  };

const storeScratch = scratch => {
    return{
        type: SET_SCRATCH,
        payload: scratch
    }
}

// --------

export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
    .then(result => {
        console.log('sign in successful: ');
    })
    .catch(error => {
        console.log('error in sign in: ');
        console.log(error);
    })
}

export const signOut = () => {
    auth.signOut()
    .then(() => {
        console.log('sign out successful')
    })
    .catch((err) => {
        console.log('error is sign out: ')
        console.log(err);
    })
}

// ---------

export const addGroupToRoutine = newGroup => {
    return{
        type: ADD_GROUP_TO_ROUTINE,
        payload: newGroup
    }
}

export const deleteGroupFromRoutine = groupId => {
    return{
        type: DELETE_GROUP_FROM_ROUTINE,
        payload: groupId
    }
}

export const reorderGroupInRoutine = groupId => {
    return{
        type: REORDER_GROUP_IN_ROUTINE,
        payload: {groupId: groupId}
    }
}

export const setRoutine = (routine, authUser) => dispatch =>{
    database
      .ref(`routineTemplate/${authUser}`)
      .set(routine);
}

export const fetchRoutine = authUserNew => dispatch => {
    database
      .ref(`routineTemplate/${authUserNew}`)
      .on("value", snapshot => {
        const val = snapshot.val();
        if(val){
          dispatch(storeRoutine(val));
        }else{
          dispatch(storeRoutine([]))
        }
      });
  };

const storeRoutine = routine => {
    return{
        type: SET_ROUTINE,
        payload: routine
    }
}

// ---

export const addEntryToTrack = newEntry => {
    return{
        type: ADD_ENTRY_TO_TRACK,
        payload: newEntry
    }
}

export const deleteEntryFromTrack = entryId => {
    return{
        type: DELETE_ENTRY_FROM_TRACK,
        payload: entryId
    }
}

export const editEntryFieldInTrack = (entryId, groupId, itemId, newVal) => {
    console.log('action edit', entryId, groupId,itemId, newVal);

    return{
        type: EDIT_ENTRY_FIELD_IN_TRACK,
        payload: {
            entryId: entryId,
            groupId: groupId,
            itemId: itemId,
            newVal: newVal
        }
    }
}

export const editEntryDate = (entryId, newDate) => {
    return{
        type: EDIT_ENTRY_DATE,
        payload: {
            entryId: entryId,
            newDate: newDate
        }
    }
}

export const setTrack = (track, authUser) => dispatch => {
    database
        .ref(`trackRecord/${authUser}`)
        .set(track);
}

export const fetchTrack = authUser => dispatch => {
    database
        .ref(`trackRecord/${authUser}`)
        .on('value', snapshot => {
            const val = snapshot.val();
            if(val){
                dispatch(storeTrack(val));
                console.log('fetched new track from server')
            } else{
                dispatch(storeTrack([]))
            }
        })
}

const storeTrack = track => {
    return{
        type: SET_TRACK,
        payload: track
    }
}