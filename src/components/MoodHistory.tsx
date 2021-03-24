import Plot from 'react-plotly.js';
import { moodColors, MoodCounters, MoodEnum } from 'app/moodCounterSlice';

interface MoodHistoryProps {
    [day: string]: MoodCounters
}

const moodSign = (mood: string) =>
    [MoodEnum.Happy, MoodEnum.Super, MoodEnum.Beer].indexOf(mood as MoodEnum) >= 0 ? +1 : -1;

const trace = (mood: string, history: { moods: MoodCounters; day: string }[]) => {
    const absValues = history.map(date => date.moods[mood] || 0);
    const yValues = absValues.map(v => v * moodSign(mood));
    return ({
        marker: {color: moodColors[mood as MoodEnum]},
        x: history.map(date => date.day),
        y: yValues,
        text: absValues.map(value =>
            value > 0 ? `<b>${value}</b> ${mood.repeat(value)}` : ''
        ),
        hoverinfo: 'x+text',
        name: mood,
        type: 'bar',
    });
}

function MoodHistory(history: MoodHistoryProps) {
    const sortedDays = Object.keys(history)
        .sort((c, d) => c.localeCompare(d));

    const sortedHistory = sortedDays
        .map(day => ({day, moods: history[day]}));

    const traces = Object.keys(moodColors)
        .map(mood => trace(mood, sortedHistory))

    const layout = {
        xaxis: {title: 'Day'},
        yaxis: {title: 'Mood'},
        barmode: 'relative',
        hovermode: 'x unified',
        width: 800, height: 400, title: 'How was the mood?'
    };

    return (
        <>
            {/*// @ts-ignore*/}
            <Plot data={traces} layout={layout}/>
        </>)
}

export default MoodHistory
