import React from 'react';
import './App.css';
import Bannerone from "./components/Bannerone";
import Bannerino from './components/Bannerino';
import MoodGrid from './containers/MoodGrid';

function App() {
  return (
    <div className="App">
      <Bannerone title="YoGa mood marbles"/>
      <Bannerino title={""+new Date()} />
      <header className="App-header">
        <MoodGrid/>
      </header>
    </div>
  );
}

export default App;
