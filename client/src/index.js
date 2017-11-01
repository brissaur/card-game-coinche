import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import mainReducer from './reducers'
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(mainReducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
