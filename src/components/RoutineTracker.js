import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {addEntryToTrack, deleteEntryFromTrack, setTrack, editEntryFieldInTrack, editEntryDate} from '../actions'

export default () => {
    const dispatch = useDispatch();
    const track = useSelector(state => state.trackState.track);
    const routine = useSelector(state => state.routineState.routine);
    const authUser = useSelector(state => state.sessionState.authUser);

    const addEntry = () => {
        dispatch(addEntryToTrack(
            {
                date: '',
                routine: routine
            }
        ))
    }

    const deleteEntry = (entryId) => {
        dispatch(deleteEntryFromTrack(entryId))
    }

    useEffect(() => {
        dispatch(setTrack(track, authUser));
        console.log('track changed in RoutineTracker')
    }, [track])

    const setEntryDate = (e, entryId) => {
        console.log('setEntryDate:', e.target.value, entryId)
        dispatch(editEntryDate(entryId, e.target.value))
    }

    return(
        <div>
            <h3>Track Routine</h3>
            <div style={{display: 'flex'}}>
                {track.map((entry, index) => (
                    <div key={index} style={{background: 'darkgrey', margin: '10px'}}>
                        <input placeholder='date' style={{margin: '10px 0'}} value={entry.date} onChange={(e) => setEntryDate(e, index)}/>
                        <Routine  routine={entry.routine} entryId={index}/>
                        <button onClick={() => deleteEntry(index)}>Delete Entry</button>
                    </div>
                ))}
                <button onClick={addEntry} style={{height: '20px', margin: '10px 0'}}>Add Entry</button>
            </div>
            <hr />
        </div>
    )
}

const Routine = (props) => {
    return(
        <div>
            {props.routine.map((group, index) => (
                <RoutineGroup key={index} group={group} entryId={props.entryId} groupId={index}/>
            ))}
        </div>
    )
}

const RoutineGroup = (props) => {
    return(
        <div style={{border: '1px solid white'}}>
            {props.group.map((item, index) => (
                <RoutineItem key={index} item={item} entryId={props.entryId} groupId={props.groupId} itemId={index}/>
            ))
            }
            <br/>
        </div>
    )
}

const RoutineItem = (props) => {
    const dispatch = useDispatch();

    // const [itemVal, setItemVal] = useState(props.item.input);

    const handleChange = e => {
        // setItemVal(e.target.value);

        dispatch(editEntryFieldInTrack(props.entryId, props.groupId, props.itemId, e.target.value))

        console.log('edit', props.entryId, props.groupId, props.itemId, e.target.value);
    }

    return(
        <div style={{border: '1px solid grey', display: 'flex'}}>
            <input placeholder={props.item.val} onChange={handleChange} value={props.item.input}/> 
            <span>{props.item.name}</span>
        </div>
    )
}