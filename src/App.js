import './App.css';
import React from 'react';
import Home from "./components/Home";
import Workout from "./components/Workout";
import Week from "./components/Week";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WorkoutDay from "./components/WorkoutDay";

function App() {
  return (
      <div className="App">
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
      </div>
  );
};

export default App;
