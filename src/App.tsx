import React from 'react';
import './App.css';
import Bannerone from "./components/Bannerone";
import Bannerino from './components/Bannerino';
import MoodGrid from './containers/MoodGrid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Bannerone title="YoGa mood marbles"/>
        <Bannerino title={new Date().toLocaleDateString() + " @ "+new Date().toLocaleTimeString()} />
        <MoodGrid/>
      </header>
    </div>
  );
}

export default App;
