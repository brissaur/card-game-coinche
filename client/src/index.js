import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase';
import 'firebase/firestore';

import * as config from './build.properties';

import reducer from './reducers';
import rootSaga from './root-saga';
import usersSaga from './users/sagas'

import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

// applying sagas
sagaMiddleware.run(rootSaga)
sagaMiddleware.run(usersSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// Initialize Firebase
const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  databaseURL: config.FIREBASE_DATABASE_URL,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
};

// const app =
firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
registerServiceWorker();
