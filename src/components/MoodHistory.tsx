import Plot from 'react-plotly.js';
import { MoodCounters, MoodEnum, Moods } from '../app/moodCounterSlice';

interface MoodHistoryProps {
    [day: string]: MoodCounters
}


const parseDate = (dmy: string) => {
    const [d, m, y] = dmy.split('/').map(p => parseInt(p));
    return +new Date(y, m + 1, d);
}

const moodSign = (mood: string) =>
    [MoodEnum.Happy, MoodEnum.Super, MoodEnum.Beer].indexOf(mood as MoodEnum) >= 0 ? +1 : -1;

const colors = {
    '🍻': '#ffad05',
    '🤩': '#0fa3b1',
    '😁': '#88d18a',
    '😵': 'hsla(0,0%,49%,0.5)',
    '😭': 'hsla(209,59%,34%,0.5)',
    '🤬': 'hsla(355,48%,50%,0.5)',
}

const trace = (mood: string, history: { moods: MoodCounters; day: string }[]) => ({
    // @ts-ignore
    marker: {color: colors[mood]},
    x: history.map(p => p.day),
    y: history.map(p => p.moods[mood] * moodSign(mood) || 0),
    name: mood,
    type: 'bar',
})

function MoodHistory(history: MoodHistoryProps) {
    const sortedDays = Object.keys(history)
        .sort((c, d) => parseDate(c) - parseDate(d));

    const sortedHistory = sortedDays
        .map(day => ({day, moods: history[day]}));

    const traces = Object.values(Moods)
        .map(mood => trace(mood, sortedHistory))

    const layout = {
        xaxis: {title: 'Day'},
        yaxis: {title: 'Mood'},
        barmode: 'relative',
        width: 800, height: 400, title: 'How was the mood?'
    };

    return (
        <>
            {/*// @ts-ignore*/}
            <Plot data={traces} layout={layout}/>
        </>)
}

export default MoodHistory
