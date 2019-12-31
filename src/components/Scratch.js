import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setScratch} from '../actions';

function AppContents() {
  const dispatch = useDispatch();
  const scratch = useSelector(state => state.scratchState.scratch);
  const authUser = useSelector(state => state.sessionState.authUser);

  const setNote = e => {
    const newText = e.target.value;
    dispatch(setScratch(newText, authUser));
  };

  return (
    <div>
        <p>User ID: {authUser}</p>
        <textarea 
        placeholder="..." 
        onChange={setNote} 
        value={scratch} 
        style={{width: '80%', height:'200px'}}
        />
        <hr/>
    </div>
  );
}

export default AppContents;
