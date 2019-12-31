import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {addEntryToTrack, deleteEntryFromTrack, setTrack, editEntryFieldInTrack, editEntryDate} from '../actions'

export default () => {
    const dispatch = useDispatch();
    const track = useSelector(state => state.trackState.track);
    const routine = useSelector(state => state.routineState.routine);
    const authUser = useSelector(state => state.sessionState.authUser);

    const [trackInput, setTrackInput] = useState([]);

    useEffect(() => {
        setTrackInput(track);
    },[track])

    const syncTrack = newTrackInput => {
        console.log('sync track to server')
        setTrackInput(newTrackInput);
        dispatch(setTrack(newTrackInput, authUser));
    }

    const addEntry = () => {
        const newTrackInput = [...trackInput, {date: '', routine: routine}];
        syncTrack(newTrackInput);
    }

    const deleteEntry = (entryId) => {
        const newTrackInput = trackInput.filter((entry, index) => (
            index !== entryId
        ))
        syncTrack(newTrackInput);

    }

    const editEntryField = (entryId, groupId, itemId, newVal) => {
        const newTrackInput = trackInput.map((entry, entryIndex) => (
            entryId !== entryIndex ? entry : {
                ...entry,
                routine: entry.routine.map((group, groupIndex) => (
                    groupId !== groupIndex ? group : (
                        group.map((item, itemIndex) => (
                            itemId !== itemIndex ? item : {
                                ...item,
                                input: newVal
                            }
                        ))
                    )
                ))
            }
        ))
        syncTrack(newTrackInput);

    }

    const setEntryDate = (e, entryId) => {
        const newTrackInput = trackInput.map((entry, entryIndex) => (
            entryId !== entryIndex ? entry : {
                ...entry,
                date: e.target.value
            }
        ))
        syncTrack(newTrackInput);
    }

    return(
        <div>
            <h3>Track Routine</h3>
            <div style={{display: 'flex'}}>
                {track.map((entry, index) => (
                    <div key={index} style={{background: 'darkgrey', margin: '10px'}}>
                        <input placeholder='date' style={{margin: '10px 0'}} value={entry.date} onChange={(e) => setEntryDate(e, index)}/>
                        <Routine  routine={entry.routine} entryId={index} editEntryField={editEntryField}/>
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
                <RoutineGroup key={index} group={group} entryId={props.entryId} groupId={index} editEntryField={props.editEntryField}/>
            ))}
        </div>
    )
}

const RoutineGroup = (props) => {
    return(
        <div style={{border: '1px solid white'}}>
            {props.group.map((item, index) => (
                <RoutineItem key={index} item={item} entryId={props.entryId} groupId={props.groupId} itemId={index} editEntryField={props.editEntryField}/>
            ))
            }
            <br/>
        </div>
    )
}

const RoutineItem = (props) => {
    // const dispatch = useDispatch();

    // const [itemVal, setItemVal] = useState(props.item.input);

    const handleChange = e => {
        // setItemVal(e.target.value);

        // dispatch(editEntryFieldInTrack(props.entryId, props.groupId, props.itemId, e.target.value))
        props.editEntryField(props.entryId, props.groupId, props.itemId, e.target.value);

        // console.log('edit', props.entryId, props.groupId, props.itemId, e.target.value);
    }

    return(
        <div style={{border: '1px solid grey', display: 'flex'}}>
            <input placeholder={props.item.val} onChange={handleChange} value={props.item.input}/> 
            <span>{props.item.name}</span>
        </div>
    )
}