import { take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { wsAction } from './actions';
import { decodeMsgFromWs } from './services';
import { getConnection } from './index';

function onerror(error) {
    global.console.error('ERROR DURING WEBSOCKET', error);
}

export function createWsChannel(connection) {
    return eventChannel((emit) => {
        /* eslint-disable no-param-reassign */
        connection.onerror = onerror;
        connection.onmessage = (event) => {
            const message = decodeMsgFromWs(event.data);
            if (message) {
                emit(message);
            }
        };
        connection.awaitConnectionOpened = new Promise((resolve) => {
            connection.onopen = function onopen() {
                global.console.log('WS connection available!');
                connection.send(JSON.stringify({ type: 'hello', payload: { message: 'really hello ^^' } }));
                resolve();
            };
        });

        return () => {
            global.console.log('Closing WS connection...');

            return connection.close();
        };
    });
}

export function* initializeWebSocket() {
    const channel = yield call(createWsChannel, getConnection());
    while (true) {
        const message = yield take(channel);
        yield put(wsAction(message));
    }
}
