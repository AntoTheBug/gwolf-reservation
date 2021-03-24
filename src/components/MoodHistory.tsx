import Plot from 'react-plotly.js';
import { moodColors, MoodCounters, MoodEnum } from 'app/moodCounterSlice';
import 'plotly.js-locales/it';
import * as Plotly from 'plotly.js';

interface MoodHistoryProps {
    [day: string]: MoodCounters
}

const moodSign = (mood: string) =>
    [MoodEnum.Happy, MoodEnum.Super, MoodEnum.Beer].indexOf(mood as MoodEnum) >= 0 ? +1 : -1;

const trace = (mood: string, history: { moods: MoodCounters; day: string }[]): Plotly.Data => {
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

    const traces: Plotly.Data[] = Object.keys(moodColors)
        .map(mood => trace(mood, sortedHistory))

    const layout: Partial<Plotly.Layout> = {
        xaxis: {
            title: 'Day',
            tickformat: '%e-%m',
            ticksuffix: `-${sortedDays?.length && sortedDays[0].substr(0, 4)}`,
            showticksuffix: 'last'
        },
        yaxis: {title: 'Mood'},
        barmode: 'relative',
        hovermode: 'x unified',
        width: 800,
        height: 400,
        title: 'How was the mood?'
    };

    return <Plot data={traces} layout={layout} config={{locale: 'it'}}/>
}

export default MoodHistory
