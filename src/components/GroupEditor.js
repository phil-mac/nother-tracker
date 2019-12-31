import React, {useState} from 'react';

export default (props) => {
    const [groupData, setGroupData] = useState([{val: '', name: ''},]);

    const newItem = {val: '', name: ''};

    const addItem = () => {
        setGroupData([...groupData, newItem])
    }

    const saveGroup = () => {
        props.saveGroup(groupData);
    }

    const updateGroup = (itemId, updatedItem) => {
        const updatedGroupData = groupData.map((item, index) => (
            itemId === index ? updatedItem : item
        ))
        
        setGroupData(updatedGroupData)
        console.log(updatedGroupData);
    }

    return(
        <div style={{border: '3px solid cyan'}}>
            {groupData.map((item, index) => (
                <ItemEditor key={index} item={item} itemId={index} updateGroup={updateGroup}/>
            ))}
            <button onClick={addItem}> + </button>
            <br/>
            <button onClick={saveGroup}> Save </button>

        </div>
    )
}

const ItemEditor = (props) => {
    const [newItem, setNewItem] = useState({id: props.itemId, val: '', name: ''});

    const handleChange = e => {
        // update the appropriate variable of the appropriate ITEM of groupData
        const updatedItem = {...newItem, [e.target.name]: e.target.value};
        setNewItem(updatedItem);
        props.updateGroup(props.itemId, updatedItem);
    }

    return(
        <div style={{border: '1px solid grey', display: 'flex'}}>
            <input name='val' placeholder='value' onChange={handleChange} value={newItem.value}/> 
            <input name='name' placeholder='name' onChange={handleChange} value={newItem.name}/> 
        </div>
    )
}