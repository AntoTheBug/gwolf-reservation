import { Button, styled } from '@material-ui/core';
import React from 'react';

interface MoodsProps {
    /** The smiley */
    text: string
    click?: () => void
    className: any
}

const NonSelectable = styled(Button)({userSelect: 'none'})
NonSelectable.displayName = 'Tot'

function Mood(props:MoodsProps) {

    return (
        <NonSelectable className={props.className} onClick={props.click}>
            <div>{props.text}</div>
        </NonSelectable>
    )
}

export default Mood;
