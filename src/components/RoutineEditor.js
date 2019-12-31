import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import RoutineGroup from './RoutineGroup';
import GroupEditor from './GroupEditor';
import {addGroupToRoutine, deleteGroupFromRoutine, reorderGroupInRoutine, setRoutine} from '../actions'

export default () => {
    const dispatch = useDispatch();
    const routine = useSelector(state => state.routineState.routine);
    const authUser = useSelector(state => state.sessionState.authUser);

    const [addingGroup, setAddingGroup] = useState(true);
    const [routineInput, setRoutineInput] = useState([]);

    // useEffect(() => {
    //     console.log('routine: ');
    //     console.log(routine);
    //     dispatch(setRoutine(routine, authUser));
    // },[routine, authUser, dispatch])

    useEffect(() => {
        setRoutineInput(routine);
    },[routine])

    const addGroup = () => {
        setAddingGroup(true);
    }

    const syncRoutine = newRoutineInput => {
        console.log('sync routine to server')
        setRoutineInput(newRoutineInput);
        dispatch(setRoutine(newRoutineInput, authUser));
    }

    const saveGroup = (groupData) => {
        const newRoutineInput = [...routineInput, groupData];
        syncRoutine(newRoutineInput);
        // dispatch(addGroupToRoutine(groupData));
    }

    const deleteGroup = (groupId) => {
        const newRoutineInput = routineInput.filter((group, index) => (
            index !== groupId
        ))
        syncRoutine(newRoutineInput);
        // console.log('delete group id', groupId);
        // dispatch(deleteGroupFromRoutine(groupId));
    }

    const moveGroup = (groupId) => {
        const i = groupId;
        const j = groupId - 1;
        if (j < 0) j = 0;
        const newRoutineInput = [...routineInput];
        [newRoutineInput[j], newRoutineInput[i]] = [newRoutineInput[i], newRoutineInput[j]];
        syncRoutine(newRoutineInput);
        // dispatch(reorderGroupInRoutine(groupId));
    }

    return(
        <div>
            <h3>Edit Routine</h3>
            {routine.map((group, index) => (
                <div key={index}>
                    <div style={{border:'1px solid white'}}>
                        <RoutineGroup  group={group}/>
                        <button onClick={() => deleteGroup(index)}>Delete</button>
                        <button onClick={() => moveGroup(index)}>Move Up</button>
                    </div>
                    <br/>
                    <br/>

                </div>
            ))}
            {addingGroup && <GroupEditor saveGroup={saveGroup}/>}
            <button onClick={addGroup}> + </button>
            <hr />
        </div>
    )
}