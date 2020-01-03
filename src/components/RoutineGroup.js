import React from 'react';

export default (props) => {
    return(
        <div style={{border: '1px solid black', background: props.group.color}}>
            {props.group.items.map((item, index) => (
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
            <input placeholder={props.item.val} disabled/>
            {props.item.increment && <span style={{background: 'lightgrey', marginRight:'2px', paddingRight:'2px'}}>+ {props.item.increment}</span>} 
            <span>{props.item.name}</span>
        </div>
    )
}