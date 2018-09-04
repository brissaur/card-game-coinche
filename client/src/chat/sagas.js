import { delay } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import { CHAT_MESSAGE_WS, wsSend } from '../technical/websocket';
import { SEND_MESSAGE, destroyChatMessage } from './ducks';
import { WS_CHAT_MESSAGE } from '../technical/websocket/actions';
import { computeDisplayTime } from './services';

function* sendMessage({ message }) {
    global.console.log('New message sent: ', message);
    yield wsSend(CHAT_MESSAGE_WS, { message });
}

function* messageReceived({ payload: { message } }) {
    global.console.log('New message received: ', message);
    yield call(delay, computeDisplayTime(message));
    yield put(destroyChatMessage(message));
}

// eslint-disable-next-line import/prefer-default-export
export function* chatWatchers() {
    yield takeEvery(SEND_MESSAGE, sendMessage);
    yield takeEvery(WS_CHAT_MESSAGE, messageReceived);
}
