import React, { useState } from 'react';
import Mood from 'components/Mood';
import { makeStyles } from '@material-ui/core/styles';
import MoodChart from 'components/MoodChart';
import { decrement, increment, moodColors, MoodEnum, selectMoodMap } from 'app/moodCounterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { prepare, selectTimer } from 'app/timerSlice';
import useLocalUserId from 'hooks/useLocalUserId';
import MoodHistory from 'components/MoodHistory';
import { selectHistory } from 'app/fireSlice';
import { FormattedMessage } from 'react-intl';

const bgColors = Object.entries(moodColors).reduce(
    (acc, [mood, color]) => ({...acc, [mood]: {'&:hover': {backgroundColor: color}}}),
    {}
);
const useStyles = makeStyles({
    ...bgColors,
    mood: {
        float: 'left', margin: '0.5em 0.2em', cursor: 'pointer', fontSize: '4em',
    },
    charts: {
        display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-evenly'
    }
})

const Timer = ({timer}: { timer: number }) => (
    <div>{
        timer <= 0 ?
            <span style={{color: 'red'}}>
                <FormattedMessage id='voteNever' defaultMessage="You haven't voted yet... maybe"/>
            </span>
            : timer < 60 ?
            <span style={{color: 'orange'}}>
                <FormattedMessage id='voteRecent' defaultMessage="You voted about {timer, number} seconds ago"
                                  values={{timer}}/>
            </span>
            :
            <span style={{color: 'purple'}}>
                <FormattedMessage id='votePast' defaultMessage="You voted a long time ago"/>
            </span>
    }</div>
);

function MoodGrid() {
    const moodMap = useSelector(selectMoodMap);
    const timer = useSelector(selectTimer).timer;
    const history = useSelector(selectHistory)

    const dispatch = useDispatch();
    const user = useLocalUserId() || ''

    const [lastClicked, setLastClicked] = useState('');

    function clickMood(mood: string) {
        // remove previous vote
        if (lastClicked) {
            dispatch(decrement({mood: lastClicked as MoodEnum}))
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
            <Timer timer={timer}/>
            <div>{moodMap && Object.keys(moodMap).map(mood =>
                // @ts-ignore
                <Mood className={`${classes.mood} ${classes[mood]}`}
                      text={mood}
                      key={mood}
                      click={() => clickMood(mood)}/>
            )}
            </div>
            <div className={classes.charts}>
                <MoodChart {...moodMap}/>
                <MoodHistory {...history} />
            </div>
        </>
    )
}

export default MoodGrid;
