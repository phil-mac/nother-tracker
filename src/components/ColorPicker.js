import React from 'react';
import '../App.css';
import Fab from '@material-ui/core/Fab';

const colors = [
    '#EDF2F7',
    '#FED7D7',
    '#FEEBC8',
    '#FEFCBF',
    '#C6F6D5',
    '#B2F5EA',
    '#BEE3F8',
    '#C3DAFE',
    '#E9D8FD',
    '#FED7E2',

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