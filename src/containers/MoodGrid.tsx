import React, { useState } from 'react';
import Mood from '../components/Mood';
import { makeStyles } from '@material-ui/core/styles';
import MoodChart from '../components/MoodChart';
import { decrement, increment, selectMoodMap } from '../app/moodCounterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { prepare, selectTimer } from '../app/timerSlice';

const useStyles = makeStyles({
    mood: {
        float: 'left',
        margin: '0.5em 0.2em',
        cursor: 'pointer',
        fontSize: '4em'
    }
})

function MoodGrid() {
    const moodMap = useSelector(selectMoodMap).moodMap;
    const timer = useSelector(selectTimer).timer;
    const dispatch = useDispatch();

    const [lastClicked, setLastClicked] = useState('');

    function clickMood(mood: string) {
        // remove previous vote
        if (lastClicked) {
            // @ts-ignore
            dispatch(decrement(lastClicked))
        }

        // add new vpte
        // @ts-ignore
        dispatch(increment(mood))

        setLastClicked(mood)

        // just for fun, make a timer
        dispatch(prepare(1))
    }

    const classes = useStyles();

    //<> is a nameless tag to call reactFragment, to create a fake root component in order to have a unique root in the tsx
    return (
        <>
            <div>{
                timer <= 0 ?
                    <span style={{color: 'red'}}>You haven't voted yet</span>
                    : timer < 60 ?
                    <span style={{color: 'orange'}}>You voted about {timer} seconds ago</span>
                    :
                    <span style={{color: 'purple'}}>You voted a long time ago</span>
            }</div>
            <div>
                {moodMap && Object.keys(moodMap).map(mood =>
                    <Mood className={classes.mood} text={mood} key={mood}
                          click={() => clickMood(mood)}/>
                )}
            </div>
            <MoodChart {...moodMap}/>
        </>
    )
}

export default MoodGrid;
