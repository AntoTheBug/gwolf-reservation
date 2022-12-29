import React from 'react';

function WeekBanner() {

    const curr = new Date();
    const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()+1));
    const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));

    return (
        <div className="mt-2">
            <h4 className={"font-weight-bold"}>{firstDay.toLocaleDateString("it-IT")} - {lastDay.toLocaleDateString("it-IT")}</h4>
        </div>

    );
};

export default WeekBanner;
