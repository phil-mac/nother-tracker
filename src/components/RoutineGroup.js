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
        <div style={{border: '1px solid grey', display: 'flex'}}>
            <input placeholder={props.item.val} /> 
            <span>{props.item.name}</span>
        </div>
    )
}