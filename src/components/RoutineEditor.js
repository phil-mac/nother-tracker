import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import RoutineGroup from './RoutineGroup';
import GroupEditor from './GroupEditor';
import {addGroupToRoutine} from '../actions'

export default () => {
    const dispatch = useDispatch();
    const routine = useSelector(state => state.routineState.routine);

    const [addingGroup, setAddingGroup] = useState(true);

    const addGroup = () => {
        setAddingGroup(true);
    }

    const saveGroup = (groupData) => {
        // dispatch action to add group to routine
        dispatch(addGroupToRoutine(groupData));
        console.log('added group data to store: ')
        console.log(groupData);
    }

    useEffect(() => {
        console.log('routine: ');
        console.log(routine);
    },[routine])

    return(
        <div>
            <hr />
            <h3>Routine</h3>
            {routine.map((group, index) => (
                <RoutineGroup group={group} key={index}/>
            ))}
            {addingGroup && <GroupEditor saveGroup={saveGroup}/>}
            <button onClick={addGroup}> + </button>
            <hr />
        </div>
    )
}