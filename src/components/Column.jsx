import React, { useState} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {db} from "../index";
import firebase from "firebase";

export default function Column(props) {

    const [visibleUsers, setVisibleUsers] = useState(false);
    const [user, setUser] = useState("");
    const updateData = props.callBack

    const showUsers = () => {
        setVisibleUsers(!visibleUsers)
    };

    const addUser = (day) => {
        db.collection("week").doc(day).update({
            users: firebase.firestore.FieldValue.arrayUnion(user)
        });
        updateData();
    };

    const removeUser = (day, userToRemove) => {
        db.collection("week").doc(day).update({
            users: firebase.firestore.FieldValue.arrayRemove(userToRemove)
        });
        updateData();
    };

    const handleChange = (e) => {
        e.preventDefault();
        setUser(e.target.value);
    };

    return (
        <div className={"gw-card"}>
            <div className={"row gw-row"} onClick={() => showUsers()}>
                <div className={"col-2"}>{props.content.day}</div>
                <div className={"col-8"}>{props.content.type}</div>
            </div>
            {visibleUsers &&
            <>
            <InputGroup className="mb-3 gw-input">
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
            <div className={"row gw-border"}>
                {props.content && props.content.users && props.content.users.map((user, index) => (
                        <div className={"col-6 gw-space"} key={user}>
                            <span className={"col-5"}>{index+1} - {user}</span>
                            <span className={"col-1"} variant="outline-secondary" onClick={() => removeUser(props.content.day, user)}>
                                <i className="fas fa-trash"></i>
                            </span>
                        </div>
                    ))
                }
            </div>
            </>}
        </div>
    );
};
