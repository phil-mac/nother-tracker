import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Route} from 'react-router-dom';

import {signInWithGoogle, setScratch} from '../actions';

import RoutineEditor from './RoutineEditor';
import RoutineTracker from './RoutineTracker';
import Scratch from './Scratch';

function AppContents() {
  const dispatch = useDispatch();
  const scratch = useSelector(state => state.scratchState.scratch);
  const authUser = useSelector(state => state.sessionState.authUser);
  const [editRoutine, setEditRoutine] = useState(false);

  const setNote = e => {
    const newText = e.target.value;
    dispatch(setScratch(newText, authUser));
  };

  return (
    <div>
        <Route exact path='/' component={RoutineTracker}/>
        <Route exact path='/edit' component={RoutineEditor}/>
        <Route exact path='/scratch' component={Scratch} />
    </div>
  );
}

export default AppContents;
