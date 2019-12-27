import React, {useState} from 'react';

export default (props) => {
    const [groupData, setGroupData] = useState([{value: '', name: ''},]);

    const newItem = {value: '', name: ''};

    const addItem = () => {
        setGroupData([...groupData, newItem])
    }

    const saveGroup = () => {
        props.saveGroup(groupData);
    }

    return(
        <div style={{border: '3px solid cyan'}}>
            {groupData.map((item, index) => (
                <ItemEditor item={item} key={index}/>
            ))}
            <button onClick={addItem}> + </button>
            <br/>
            <button onClick={saveGroup}> Save </button>

        </div>
    )
}

const ItemEditor = (props) => {
const handleChange = e => {
    // update the appropriate variable of the appropriate ITEM of groupData
    console.log('do thing');
}
    return(
        <div style={{border: '1px solid grey', display: 'flex'}}>
            <input name='value' placeholder='value' onChange={handleChange}/> 
            <input name='name' placeholder='name' onChange={handleChange}/> 
        </div>
    )
}