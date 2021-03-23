import Plot from 'react-plotly.js';

interface MoodChartProps {
    [key: string]: number
}

function MoodChart(props: MoodChartProps) {

    return (
        <div>
            <Plot
                data={[
                    {type: 'bar', x: Object.keys(props), y: Object.values(props)},
                ]}
                layout={ {width: 800, height: 400, title: "How's the mood today?"} }
            />
            <pre>{JSON.stringify(props)}</pre>
        </div>)
}

export default MoodChart
