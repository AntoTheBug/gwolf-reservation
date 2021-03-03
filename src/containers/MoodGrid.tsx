import React from 'react';
import Mood from '../components/Mood';

function MoodGrid(props:any) {
    return (
        <div>
            <Mood/>
            <Mood/>
            <Mood/>
            <Mood/>
        </div>
    )
}

export default MoodGrid;
