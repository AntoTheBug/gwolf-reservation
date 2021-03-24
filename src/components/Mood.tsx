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

const Mood = (props:MoodsProps) => (
    <NonSelectable className={props.className} onClick={props.click}>
        {props.text}
    </NonSelectable>
);

export default Mood;
