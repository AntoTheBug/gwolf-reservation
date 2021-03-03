import React from 'react';
import Mood from '../components/Mood';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( {
    mood: {
        float: 'left',
        margin: '2em 2em'
    }
})


function MoodGrid(props:any) {

    function clickMood() {
        alert('ciao')
    }
    const classes = useStyles();

    return (
        <div>
            <Mood className={classes.mood} text='😁' click={clickMood} />
            <Mood className={classes.mood} text='😣'/>
            <Mood className={classes.mood} text='🤬'/>
            <Mood className={classes.mood} text='😵'/>
        </div>
    )
};

export default MoodGrid;
