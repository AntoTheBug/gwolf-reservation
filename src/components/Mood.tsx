import { Button, styled } from '@material-ui/core';

/**
 * Properties of mood
 */
interface MoodsProps {
    /** The smiley */
    text: string
    /** The action that will be called on `click` */
    click?: () => void
    /** A CSS class name */
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
