import { take, put, call, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { wsAction } from './actions';
import { decodeMsgFromWs, formatMsgForWs } from './services';
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
                connection.send(formatMsgForWs('hello', { message: 'really hello ^^' }));
                resolve();
            };
        });

        return () => {
            global.console.log('Closing WS connection...');

            return connection.close();
        };
    });
}

function* listenForChannelEvents(channel) {
    while (true) {
        const message = yield take(channel);
        yield put(wsAction(message));
    }
}

export function* initializeWebSocket() {
    const channel = yield call(createWsChannel, getConnection());

    yield fork(listenForChannelEvents, channel);
}
