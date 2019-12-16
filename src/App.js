import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setScratch, setAuthUser} from './actions';
import './App.css'; 

import {database, signInWithGoogle, signOut, useAuth} from './firebase';

import TestComp from './components/TestComp';

function App() {
  const dispatch = useDispatch();
  const scratch = useSelector(state => state.scratchState.scratch);
  const authUser = useSelector(state => state.sessionState.authUser);

  const user = useAuth();

  useEffect(() => {
    if(user){
      const userId = user.uid;
      dispatch(setAuthUser(userId));
      getNoteFromServer(userId);
  
    }else{
      dispatch(setAuthUser(null));
    }
  }, [user])

  const getNoteFromServer = (authUserNew) => {
    console.log('get note from server for userId: ' + authUserNew);
    database
      .ref(`scratchTest/${authUserNew}`)
      .on("value", snapshot => {
        const val = snapshot.val();
        console.log('got val: ')
        console.log(val);
        if(val){
          dispatch(setScratch(val));
        }else{
          dispatch(setScratch('Write whatever you want here and it will be saved as you go.'))
        }
      });
  };

  const setNoteOnServer = e => {
    const newText = e.target.value;
    dispatch(setScratch(newText));
    database
      .ref(`scratchTest/${authUser}`)
      .set(newText);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>'nother tracker</h1>
        {authUser
        ? <button onClick={signOut}>Sign Out</button>
        : <button onClick={signInWithGoogle}>Sign in With Google</button>
        }
        <br/>
        {authUser && <div>
          <hr/>
          <p>User ID: {authUser}</p>
          <textarea 
          placeholder="..." 
          onChange={setNoteOnServer} 
          value={scratch} 
          style={{width: '80%', height:'200px'}}
          />
          <hr/>
        </div>}

        <TestComp />
      </header>
    </div>
  );
}

export default App;
