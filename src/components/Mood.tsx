import React from 'react';

interface MoodsProps {
    text: string
    click?: () => void
}

function Mood(props:MoodsProps) {

    return (
        <div onClick={props.click}>{props.text}</div>
    )
}

export default Mood;
