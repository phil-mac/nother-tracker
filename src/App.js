import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {signInWithGoogle, signOut, fetchAuthUser, setScratch} from './actions';
import './App.css'; 

import TestComp from './components/TestComp';
import RoutineEditor from './components/RoutineEditor';
import RoutineTracker from './components/RoutineTracker';


function App() {
  const dispatch = useDispatch();
  const scratch = useSelector(state => state.scratchState.scratch);
  const authUser = useSelector(state => state.sessionState.authUser);
  const [editRoutine, setEditRoutine] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthUser());
  },[])

  const setNote = e => {
    const newText = e.target.value;
    dispatch(setScratch(newText, authUser));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>'nother tracker</h1>
        <button onClick={() => setEditRoutine(false)}>Track</button>
        <button onClick={() => setEditRoutine(true)}>Edit</button>
        <hr />
        {editRoutine
        ? <RoutineEditor />
        : <RoutineTracker/>
        }
        

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
          onChange={setNote} 
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
