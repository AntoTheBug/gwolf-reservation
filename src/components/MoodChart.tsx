import Plot from 'react-plotly.js';

interface MoodChartProps {
    [key: string]: number
}

function MoodChart(props: MoodChartProps) {

    return (
        <>
            <Plot
                data={[
                    {type: 'bar', x: Object.keys(props), y: Object.values(props)},
                ]}
                layout={ {width: 800, height: 400, title: "How's the mood?"} }
            />
            <pre>{JSON.stringify(props)}</pre>
        </>)
}

export default MoodChart
