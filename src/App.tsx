import React from 'react';
import logo from './logo.svg';
import './App.css';
import Bannerone from "./components/Bannerone";
import Bannerino from './components/Bannerino';

function App() {
  return (
    <div className="App">
      <Bannerone title="YoGa mood marbles"/>
      <Bannerino title={""+new Date()} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to YoGa React
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
