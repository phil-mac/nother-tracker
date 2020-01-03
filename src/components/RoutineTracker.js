import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import '../App.css'
import * as DateUtil from '../utils/date';

import {addEntryToTrack, deleteEntryFromTrack, setTrack, editEntryFieldInTrack, editEntryDate} from '../actions'

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    button: {
        margin: theme.spacing(1),
      },
    }
  }));

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
        const currentTime = Date.now();
        const newTrackInput = [...trackInput, {timeCreated: currentTime, date: DateUtil.formatDate(currentTime), routine: routine}];
        syncTrack(newTrackInput);
        console.log()
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
                        {...group, items: group.items.map((item, itemIndex) => (
                            itemId !== itemIndex ? item : {
                                ...item,
                                input: newVal
                            }
                        ))}
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

    const classes = useStyles();

    return(
        <div className='trackCont'>
            {track.map((entry, index) => (
                <div key={index} >
                    <div className='trackDateBox'>
                        <input placeholder='date' value={entry.date} onChange={(e) => setEntryDate(e, index)} className='trackDateField'/>
                    </div>
                    <Routine  routine={entry.routine} entryId={index} editEntryField={editEntryField}/>
                    <div className='deleteEntryButtonDiv' >
                        <IconButton aria-label="delete" onClick={() => deleteEntry(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            ))}
            <div className={classes.root}>
                <Fab color="primary" aria-label="add" onClick={addEntry}>
                    <AddIcon />
                </Fab>
            </div>
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
        <div className='trackGroup' style={{background: props.group.color}}>
            {props.group.items.map((item, index) => (
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

    const handleIncrement = () => {
        let newVal = parseInt(props.item.increment);
        if (props.item.input){
            newVal = parseInt(props.item.input) + parseInt(props.item.increment);
        }
        props.editEntryField(props.entryId, props.groupId, props.itemId, newVal);
    }

    return(
        <div className='trackItem'>
            <input placeholder={props.item.val} onChange={handleChange} value={props.item.input} className='trackField'/> 
            {props.item.increment && 
                <>
                <Fab onClick={handleIncrement} color="primary" aria-label="add" size='small' className='fabTest'>
                    <AddIcon fontSize='inherit'/>
                </Fab>
                </>
            }
            
            <span>{props.item.name}</span>
        </div>
    )
}