import {database, auth, googleProvider} from '../firebase';

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_SCRATCH = 'SET_SCRATCH';

export const fetchAuthUser = () => dispatch => {
    auth.onAuthStateChanged(user => {
        if (user){
            const id = user.uid;
            dispatch(setAuthUser(id));
            dispatch(fetchScratch(id))
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