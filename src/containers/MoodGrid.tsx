import React, { useState } from 'react';
import Mood from '../components/Mood';
import { makeStyles } from '@material-ui/core/styles';
import MoodChart from '../components/MoodChart';
import { decrement, increment, MoodEnum, selectMoodMap } from '../app/moodCounterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { prepare, selectTimer } from '../app/timerSlice';
import useLocalUserId from '../hooks/useLocalUserId';
import MoodHistory from '../components/MoodHistory';
import { selectHistory } from '../app/fireSlice';

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
    const history = useSelector(selectHistory)

    const dispatch = useDispatch();
    const user = useLocalUserId() || ''

    const [lastClicked, setLastClicked] = useState('');

    function clickMood(mood: string) {
        // remove previous vote
        if (lastClicked) {
            dispatch(decrement(lastClicked as MoodEnum))
        }

        // add new vote
        dispatch(increment({mood: mood as MoodEnum, user}))

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
                    <span style={{color: 'red'}}>You haven't voted yet... maybe</span>
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
            <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-evenly'}}>
                <MoodChart {...moodMap}/>
                <MoodHistory {...history} />
            </div>
        </>
    )
}

export default MoodGrid;
