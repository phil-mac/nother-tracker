import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setScratch, setAuthUser} from './actions';
import './App.css'; 

import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAU_qDG9me2Pxi7PeK2L576lDX6WaB7MEo",
    authDomain: "nother-tracker.firebaseapp.com",
    databaseURL: "https://nother-tracker.firebaseio.com",
    projectId: "nother-tracker",
    storageBucket: "nother-tracker.appspot.com",
    messagingSenderId: "529311583440",
    appId: "1:529311583440:web:307f12f3ddcdfd8893a2d5"
  };

function App() {
  const dispatch = useDispatch();
  const scratch = useSelector(state => state.scratchState.scratch);
  const authUser = useSelector(state => state.sessionState.authUser);

  useEffect(() => {
    firebase.initializeApp(config);

    const listener = firebase.auth().onAuthStateChanged(authUserNew => {
      if(authUserNew){
        console.log('got new auth user, is not null: ');
        console.log(authUserNew);
        const userId = authUserNew.uid;
        dispatch(setAuthUser(userId))
        getNoteFromServer(userId);
      } else{
        console.log('got new auth user, IS NULL');
        dispatch(setAuthUser(null));
      }
    })

    return () => listener();
  }, []);

  const getNoteFromServer = (authUserNew) => {
    console.log('get note from server for userId: ' + authUserNew);
    firebase
      .database()
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

    firebase
      .database()
      .ref(`scratchTest/${authUser}`)
      .set(newText);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      console.log('sign in successful: ');
    }).catch(error => {
      console.log('error in sign in: ');
      console.log(error);
    })
  }

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('sign out successful')
    }).catch((err) => {
      console.log('error is sign out: ')
      console.log(err);
    })
  }

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
      </header>
    </div>
  );
}

export default App;
