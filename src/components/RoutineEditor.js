import React from 'react';
import {useSelector} from 'react-redux';

import RoutineGroup from './RoutineGroup';

export default () => {
    const routine = useSelector(state => state.routineState.routine);

    return(
        <div>
            <hr />
            <h3>Routine</h3>
            {routine.map((group, index) => (
                <RoutineGroup group={group} key={index}/>
            ))}
            <hr />
        </div>
    )
}