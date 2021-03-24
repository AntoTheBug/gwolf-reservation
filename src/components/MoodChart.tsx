import Plot from 'react-plotly.js';
import { moodColors, MoodEnum } from 'app/moodCounterSlice';

interface MoodChartProps {
    [key: string]: number
}

function MoodChart(props: MoodChartProps) {
    const xValues = Object.keys(props);
    const yValues = Object.values(props);
    const markerColor = xValues.map(mood => moodColors[mood as MoodEnum])

    return (
        <div>
            <Plot
                data={[
                    {type: 'bar', x: xValues, y: yValues, marker: {color:markerColor}},
                ]}
                layout={ {width: 800, height: 400, title: "How's the mood today?"} }
            />
            <pre>{JSON.stringify(props)}</pre>
        </div>)
}

export default MoodChart
