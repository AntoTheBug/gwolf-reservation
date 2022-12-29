import React, {useEffect, useState} from 'react';
import {db} from "../index";
import {useParams,useLocation} from "react-router-dom";
import RegistrationCard from "./RegistrationCard";

export default function WorkoutDay() {
    const {id} = useParams();
    const { state } = useLocation();
    console.log(state)
    const [workouts, setWorkouts] = useState([]);

    const loadData = () => {
        db.collection("workout-week").doc(id).collection("workouts")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                setWorkouts(data)
            })
    };

    useEffect(()=>{loadData()},[])

    const updateData = () => {
        setTimeout(
            function() {
                loadData();
            },
            200
        );
    };

    return (
        <div className="container">
            <h2>{state.day}</h2>
            {workouts.sort((a,b) => a.order - b.order)
                .map((d) => (
                    <RegistrationCard key={id} content={d} day={id} callBack={updateData}/>
                ))}
        </div>
    );
};
