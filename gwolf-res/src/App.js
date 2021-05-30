import './App.css';
import React from 'react';
import WeekBanner from "./components/WeekBanner";
import RegistrationTable from "./components/RegistrationTable";


function App() {
  return (
      <div className="App">
          <header className="App-header">
              <WeekBanner></WeekBanner>
          </header>
          <RegistrationTable></RegistrationTable>
      </div>
  );
};

export default App;
