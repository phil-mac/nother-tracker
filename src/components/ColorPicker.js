import React from 'react';
import '../App.css';
import Fab from '@material-ui/core/Fab';

const colors = [
    'lightblue',
    'mediumpurple'
]

export default (props) => {
    return(
        <div className='colorPickerCont'>
            {colors.map(color => (
                <Fab onClick={() => props.setGroupColor(color)} color="inherit" aria-label="add" size='small'>
                    <div className='testColor' style={{background: color}}></div>
                </Fab>
            ))}
            
            
        </div>
    )
}