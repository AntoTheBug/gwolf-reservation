import {Link} from "react-router-dom";

export default function DayButton(props) {
    return (
        <Link to={`/day/${props.url}`}
        state={{day: props.day}}>
            <div className="previousBtn">
                <b>{props.day}</b>
            </div>
        </Link>
    );
};
