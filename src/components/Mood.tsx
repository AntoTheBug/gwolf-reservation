import { Button, styled } from '@material-ui/core';
import React from 'react';

interface MoodsProps {
    text: string
    click?: () => void
    className: any
}

const NonSelectable = styled(Button)({userSelect: 'none'})

function Mood(props:MoodsProps) {

    return (
        <NonSelectable className={props.className} onClick={props.click}>{props.text}</NonSelectable>
    )
}

export default Mood;
