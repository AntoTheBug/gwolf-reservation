import React from 'react';

function WeekBanner() {

    const curr = new Date();
    const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()+1));
    const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));

    return (
        <div>
            <h1>{firstDay.toLocaleDateString("it-IT")} - {lastDay.toLocaleDateString("it-IT")}</h1>
            <h1>Allenamenti settimanali</h1>
        </div>

    );
};

export default WeekBanner;
