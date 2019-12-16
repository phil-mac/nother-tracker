import React from 'react'
import {useSelector} from 'react-redux';

export default () => {
    const userId = useSelector(state => state.sessionState.authUser);

    return(
        <div>
            <hr/>
            user in test comp:
            <p>{userId}</p>
        </div>
    )
}