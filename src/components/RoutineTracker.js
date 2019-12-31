import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import '../App.css'

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
        <div style={{background: 'coral'}}>
            <div style={{display: 'flex'}}>
                {track.map((entry, index) => (
                    <div key={index} >
                        <div className='trackDateBox'>
                            <input placeholder='date' style={{margin: '10px 0'}} value={entry.date} onChange={(e) => setEntryDate(e, index)}/>
                        </div>
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
        <div className='trackGroup'>
            {props.group.map((item, index) => (
                <RoutineItem key={index} item={item} entryId={props.entryId} groupId={props.groupId} itemId={index} editEntryField={props.editEntryField}/>
            ))
            }
        </div>
    )
}

const RoutineItem = (props) => {
    const handleChange = e => {
        props.editEntryField(props.entryId, props.groupId, props.itemId, e.target.value);
    }

    return(
        <div className='trackItem'>
            <input placeholder={props.item.val} onChange={handleChange} value={props.item.input}/> 
            <span>{props.item.name}</span>
        </div>
    )
}