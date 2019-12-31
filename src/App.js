import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {signInWithGoogle, signOut, fetchAuthUser, setScratch} from './actions';
import './App.css'; 

import DrawerNavWrapper from './components/DrawerNavWrapper';
import SignIn from './components/SignIn';


function App() {
  const dispatch = useDispatch();
  // const scratch = useSelector(state => state.scratchState.scratch);
  const authUser = useSelector(state => state.sessionState.authUser);
  // const [editRoutine, setEditRoutine] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthUser());
  },[])

  // const setNote = e => {
  //   const newText = e.target.value;
  //   dispatch(setScratch(newText, authUser));
  // };

  return (
    <div className="App">
      <header className="App-header">
        {authUser
          ? <DrawerNavWrapper signOut={signOut}/>
          : <SignIn signInWithGoogle={signInWithGoogle}/>
        }

        
        {/* <Navigation /> */}
        
        {/* {authUser
        ? <button onClick={signOut}>Sign Out</button>
        : <button onClick={signInWithGoogle}>Sign in With Google</button>
        }
        <br/>
        {authUser && <div>
          <button onClick={() => setEditRoutine(false)}>Track</button>
          <button onClick={() => setEditRoutine(true)}>Edit</button>
          <hr />
          {editRoutine
          ? <RoutineEditor />
          : <RoutineTracker/>
          }
          <hr/>
          <p>User ID: {authUser}</p>
          <textarea 
          placeholder="..." 
          onChange={setNote} 
          value={scratch} 
          style={{width: '80%', height:'200px'}}
          />
          <hr/>
        </div>} */}

      </header>
    </div>
  );
}

export default App;
