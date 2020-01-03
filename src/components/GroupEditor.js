import React, {useState, useEffect} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import ColorPicker from './ColorPicker';

export default (props) => {
    const [groupData, setGroupData] = useState(props.startingData ? props.startingData : {color: 'lightgrey', items:[{val: '', name: ''},]});
    

    const newItem = {val: '', name: '', increment: ''};

    const addItem = () => {
        setGroupData({...groupData, items: [...groupData.items, newItem]})
    }

    const saveGroup = () => {
        if (props.saveNewGroup){
            props.saveNewGroup(groupData);
        } else if (props.saveEdittedGroup){
            props.saveEdittedGroup(groupData, props.editId);
        }
    }

    const updateGroup = (itemId, updatedItem) => {
        const updatedItems = groupData.items.map((item, index) => (
            itemId === index ? updatedItem : item
        ))
        
        setGroupData({...groupData, items: updatedItems})
    }

    const deleteItem = (itemId) => {
        const updatedItems = groupData.items.filter((item, index) => (
            index !== itemId
        ))
        setGroupData({...groupData, items: updatedItems});
    }

    const reorderItem = (itemId, moveUp) => {
        const i = itemId;
        let j = itemId;
        moveUp ? (j = itemId - 1) : (j = itemId + 1);
        if (j < 0) j = 0;
        if (j > groupData.items.length - 1) j = groupData.items.length - 1;
        
        const newItems = [...groupData.items];
        [newItems[j], newItems[i]] = [newItems[i], newItems[j]];
        setGroupData({...groupData, items: newItems});
    }

    const setGroupColor = (newColor) => {
        setGroupData({...groupData, color: newColor})
    }

    return(
        <div style={{border: '3px solid cyan', background: groupData.color}}>
            <ColorPicker setGroupColor={setGroupColor}/>
            {groupData.items.map((item, index) => (
                <ItemEditor key={index} item={item} itemId={index} updateGroup={updateGroup} reorderItem={reorderItem} deleteItem={deleteItem}/>
            ))}
            <button onClick={addItem}> + </button>
            <br/>
            <button onClick={saveGroup}> Save </button>

        </div>
    )
}

const ItemEditor = (props) => {
    const [newItem, setNewItem] = useState({id: props.itemId, val: '', name: '', increment: ''});

    useEffect(() => {
        console.log('item edior iem:')
        console.log(props.item)
        setNewItem(props.item);
    },[props.item])

    const handleChange = e => {
        // update the appropriate variable of the appropriate ITEM of groupData
        const updatedItem = {...newItem, [e.target.name]: e.target.value};
        setNewItem(updatedItem);
        props.updateGroup(props.itemId, updatedItem);
    }

    return(
        <div style={{border: '1px solid grey', display: 'flex'}}>
            <input name='val' placeholder='value' onChange={handleChange} value={newItem.val}/> 
            <input name='increment' placeholder='increment' onChange={handleChange} value={newItem.increment}/> 
            <input name='name' placeholder='name' onChange={handleChange} value={newItem.name}/>
            <IconButton aria-label="delete" size="small" onClick={() => props.reorderItem(props.itemId, true)}>
                <ArrowUpwardIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={() => props.reorderItem(props.itemId, false)}>
                <ArrowDownwardIcon fontSize="inherit" />
            </IconButton>
            <IconButton color='primary' aria-label="delete" onClick={() => props.deleteItem(props.itemId)} size='small'>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </div>
    )
}