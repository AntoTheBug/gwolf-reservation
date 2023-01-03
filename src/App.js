import './App.css';
import React, {useEffect, useState} from 'react';
import Home from "./components/Home";
import Workout from "./components/Workout";
import Week from "./components/Week";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WorkoutDay from "./components/WorkoutDay";
import darkMode from "./images/dark.png";

function App() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

  return (
      <div className={`App ${theme}`}>
          <Router>
              <NavBar />
              <div className="pages">
                  <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route path="/week" element={<Week />}  />
                      <Route path="/workout" element={<Workout />}  />
                      <Route path="/day/:id" element={<WorkoutDay />}  />
                  </Routes>
              </div>
          </Router>

          <div className="darkMode" onClick={toggleTheme}>
              <img src={darkMode} alt="darkmode" width="40px" height="40px"/>
          </div>
      </div>
  );
};

export default App;
