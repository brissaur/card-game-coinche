import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import rootSaga from './root-saga';
import usersSaga from './user/sagas';

import App from './App';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);
/* eslint-enable */

// applying sagas
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(usersSaga);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
