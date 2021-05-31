import React, { useState} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {db} from "../index";
import firebase from "firebase";

export default function Column(props) {

    const [visibleUsers, setVisibleUsers] = useState(false);
    const [user, setUser] = useState("");

    const showUsers = () => {
        setVisibleUsers(!visibleUsers)
    };

    const addUser = (day) => {
        db.collection("week").doc(day).update({
            users: firebase.firestore.FieldValue.arrayUnion(user)
        });
    };

    const removeUser = (day, userToRemove) => {
        db.collection("week").doc(day).update({
            users: firebase.firestore.FieldValue.arrayRemove(userToRemove)
        });
    };

    const handleChange = (e) => {
        e.preventDefault();
        setUser(e.target.value);
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
                        <>
                        <div className={"col-6"} key={user}>{user}</div>
                        <Button variant="outline-secondary" onClick={() => removeUser(props.content.day, user)}>-</Button>
                        </>
                        ))}
                </div>}
            </div>}
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Nome"
                    aria-label="Name"
                    aria-describedby="basic-addon2"
                    value={user}
                    onChange={handleChange}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => addUser(props.content.day)}>Registrati</Button>
                </InputGroup.Append>
            </InputGroup>
        </>
    );
};
