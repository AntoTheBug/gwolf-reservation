import React, {useEffect, useState} from 'react';
import {db} from "../index";
import DayButton from "./DayButton";

export default function RegistrationTable() {

    const [days, setDays] = useState([]);

    const loadData = () => {
    db.collection("workout-week")
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            setDays(data)
        })
    };
    useEffect(()=>{loadData()},[])

    return (
        <div className="container">
            {days.sort((a,b) => a.order - b.order)
                .map((d) => (
                    <DayButton url={d.url} day={d.day} to={`/day/${d.url}`}/>
            ))}
        </div>
    );
};
