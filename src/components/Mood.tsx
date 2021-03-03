import React from 'react';

interface MoodsProps {
    text: string
    click?: () => void
    className: any
}

function Mood(props:MoodsProps) {

    return (
        <div className={props.className} onClick={props.click}>{props.text}</div>
    )
}

export default Mood;
