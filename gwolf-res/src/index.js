import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-calendar/dist/Calendar.css'
import 'bootstrap/dist/css/bootstrap.css';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
    apiKey: "AIzaSyBWYoLCNX0JFxsewuGH_Z4OtxQU0QSK3gc",
    authDomain: "graywolf-reservation.firebaseapp.com",
    projectId: "graywolf-reservation",
    storageBucket: "graywolf-reservation.appspot.com",
    messagingSenderId: "198485844044",
    appId: "1:198485844044:web:89385d929616afa754d4e9"
};

const firebaseApp =  firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
