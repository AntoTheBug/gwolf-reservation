import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store';
import { Provider } from 'react-redux';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore



const firebaseConfig = {
    apiKey: "AIzaSyBXNpTOw1rI6Qnx__T5fFVJHIOzU4mesIo",
    authDomain: "yoga-mood.firebaseapp.com",
    projectId: "yoga-mood",
    storageBucket: "yoga-mood.appspot.com",
    messagingSenderId: "700826247687",
    appId: "1:700826247687:web:0c61728ab4d6698916c0a2"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
