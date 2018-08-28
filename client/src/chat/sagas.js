import { takeEvery } from 'redux-saga/effects';
import { CHAT_MESSAGE_WS, wsSend } from '../technical/websocket';
import { SEND_MESSAGE } from './ducks';

function* cardPlayed({ message }) {
    global.console.log('New message sent: ', message);
    yield wsSend(CHAT_MESSAGE_WS, { message });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(SEND_MESSAGE, cardPlayed);
}
