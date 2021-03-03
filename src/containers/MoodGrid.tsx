import React from 'react';
import Mood from '../components/Mood';

function MoodGrid(props:any) {

    function clickMood() {
        alert('ciao')
    }

    return (
        <div>
            <Mood text='😁' click={clickMood} />
            <Mood text='😣'/>
            <Mood text='🤬'/>
            <Mood text='😵'/>
        </div>
    )
};

export default MoodGrid;
