import React, {useState} from 'react';
import {db} from "../index";
import {Table} from "react-bootstrap";

function RegistrationTable() {

    const [days, setDays] = useState(null);

    db.collection("week")
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data); // array of cities objects
            setDays(data );
        })

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>{days}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
            </tr>
            </tbody>
        </Table>
    );
};

export default RegistrationTable;
