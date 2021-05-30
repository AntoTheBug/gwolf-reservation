import React from 'react';

export default function Column(props) {
    return (
        <>
            <div className={"row"}>
                <div className={"col-3"}>{props.content.day}</div>
                <div className={"col-3"}>{props.content.type}</div>
            </div>
            <div className={"row"}>
                {props.content && props.content.users &&
                <div>
                    {props.content.users.map((user) => (
                        <div className={"col-6"} key={user}>{user}</div>
                        ))}
                </div>}
            </div>
        </>
    );
};
