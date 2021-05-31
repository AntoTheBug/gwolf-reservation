import React, { useState} from 'react';
import {Button} from "react-bootstrap";

export default function Column(props) {

    const [visibleUsers, setVisibleUsers] = useState(false);

    const showUsers = () => {
        setVisibleUsers(!visibleUsers)
    };

    const register = (day) => {
       alert(day)
    };

    return (
        <>
            <div className={"row gw-row"} onClick={() => showUsers()}>
                <div className={"col-2"}>{props.content.day}</div>
                <div className={"col-8"}>{props.content.type}</div>
            </div>
            {visibleUsers && <div className={"row"}>
                {props.content && props.content.users &&
                <div>
                    {props.content.users.map((user) => (
                        <div className={"col-6"} key={user}>{user}</div>
                        ))}
                </div>}
            </div>}
            <Button onClick={() => register(props.content.day)}>Registrati</Button>
        </>
    );
};
