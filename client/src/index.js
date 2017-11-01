import React from 'react';
import ReactDOM from 'react-dom';
import * as config from './build.properties.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import 'firebase/firestore';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// Initialize Firebase
const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId : config.FIREBASE_PROJECT_ID,
    databaseURL: config.FIREBASE_DATABASE_URL,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
};
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log(firebase);