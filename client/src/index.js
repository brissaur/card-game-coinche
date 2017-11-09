import React from 'react'
import * as config from './build.properties.js';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import rootSaga from './root-saga'
import usersSaga from './users/sagas'

import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware),
)

// applying sagas
sagaMiddleware.run(rootSaga)
sagaMiddleware.run(usersSaga)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();