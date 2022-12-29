import React from "react";
import {Link} from "react-router-dom";
import "./Home.css";
import logo from "../images/logo192.png";

export default function Home() {
    return (
        <>
            <div className="nextPreviousWrapper">
                <Link to="/week">
                    <div className="previousBtn">
                        <b>La settimana all'Obstacle Village</b>
                    </div>
                </Link>
                <Link to="/workout">
                    <div className="previousBtn">
                        <b>Gli allenamenti all'Obstacle Village</b>
                    </div>
                </Link>
                <a href="https://docs.google.com/spreadsheets/d/1S5hz9q3el55AkDKLGKXX3d9l1k-bJBC8C_6ExUzfDyU/edit?usp=sharing" target="_blank">
                    <div className="previousBtn">
                        <b>Calendario gare</b>
                    </div>
                </a>
            </div>
            <div className="logo">
            <img src={logo} alt="Logo" width="192px" height="192px"/>
            </div>
        </>
    );
};