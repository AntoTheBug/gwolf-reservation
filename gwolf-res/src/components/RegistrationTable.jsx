import React, {useEffect, useState} from 'react';
import {db} from "../index";
import Column from "./Column";

export default function RegistrationTable() {

    const [days, setDays] = useState([]);

    const loadData = () => {
    db.collection("week")
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            setDays(data)
        })
    };
    useEffect(()=>{loadData()},[])

    return (
        <>
        <div className="container">
            {days.sort((a,b) => a.order - b.order)
                .map((d) => (
                <Column key={d.day} content={d} callBack={loadData}/>
            ))}
        </div>
        </>
    );
};
