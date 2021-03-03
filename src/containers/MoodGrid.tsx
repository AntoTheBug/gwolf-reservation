import React, {useState} from 'react';
import Mood from '../components/Mood';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( {
    mood: {
        float: 'left',
        margin: '0.5em 0.2em',
        cursor: 'pointer',
        fontSize: '4em'
    }
})


function MoodGrid() {

    const moods: string[] = ['😁', '😣', '🤬', '😵'];

    const [counter, setCounter] = useState({})

    function clickMood(mood: string) {
        const counter2: { [key: string]: number } = {...counter};
        counter2[mood] = (counter2[mood]?? 0) + 1
        setCounter(counter2)
    }

    const classes = useStyles();

    return (
        <div>
            {moods.map(mood => <Mood className={classes.mood} text={mood} click={() => clickMood(mood) } />)}
        </div>
    )
};

export default MoodGrid;
