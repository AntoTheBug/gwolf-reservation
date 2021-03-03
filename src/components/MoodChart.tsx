import React from 'react';

interface MoodChartProps {  
    [key: string]: number
}

function MoodChart(props:MoodChartProps){
    return (<pre>{JSON.stringify(props)}</pre>)
}

export default MoodChart
