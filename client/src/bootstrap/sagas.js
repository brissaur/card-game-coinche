import { put, call } from 'redux-saga/effects';
import { registerPlayer } from '../player/sagas';
import { createTableAndAddPlayerToTable } from '../table/sagas';
import { setAppLoaded } from '../bootstrap/duck';

function* initializeWebSocket() {
    yield console.log('Starting...');
    const connection = new WebSocket('ws://localhost:8080');
    connection.onopen = function (a) {
        console.log('Connection openeed', a);
        connection.send(JSON.stringify({ type: 'hello', payload: { message: 'really hello ^^' } }));

        // connection is opened and ready to use
    };

    connection.onerror = function (error) {
        console.error(error);
        // an error occurred when sending/receiving data
    };

    connection.onmessage = function (message) {
        // try to decode json (I assume that each message
        // from server is json)
        try {
            const json = JSON.parse(message.data);
            console.log('New message', json);
        } catch (e) {
            console.log("This doesn't look like a valid JSON: ", message.data);
        }
        // handle incoming message
    };
}

export default function* initAppSagas() {
    try {
        yield call(initializeWebSocket);
        // yield call(registerPlayer);
        // yield call(createTableAndAddPlayerToTable);
        yield put(setAppLoaded());
    } catch (e) {
        global.console.error(e);
        yield put(setAppLoaded(e.message));
    }
}
