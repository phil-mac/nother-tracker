import React from 'react';
import Button from '@material-ui/core/Button';

import '../App.css'

export default (props) => {
    return(
        <div className='signInCont'>
            <Button variant="contained" color="primary" onClick={props.signInWithGoogle}>Sign in With Google</Button>
        </div>
    )
}