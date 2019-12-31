import React from 'react';

export default (props) => {
    return(
        <div style={{border: '1px solid white'}}>
            {props.group.map((item, index) => (
                <RoutineItem item={item} key={index}/>
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