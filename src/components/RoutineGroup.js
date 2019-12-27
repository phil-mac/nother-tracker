import React from 'react';

export default (props) => {
    return(
        <div style={{border: '1px solid white'}}>
            {props.group.map(item => (
                <RoutineItem item={item}/>
            ))
            }
            <br/>
        </div>
    )
}

const RoutineItem = (props) => {
    return(
        <div style={{border: '1px solid grey'}}>
            <input placeholder='value' value={props.item.val}/> 
            <input placeholder='name'value={props.item.name}/>
        </div>
    )
}