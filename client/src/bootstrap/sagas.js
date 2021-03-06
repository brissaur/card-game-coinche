import { put, fork } from 'redux-saga/effects';
import { setAppLoaded } from './duck';
import { initializeWebSocket } from '../technical/websocket/saga';

export default function* initAppSagas() {
    try {
        yield fork(initializeWebSocket);
        yield put(setAppLoaded());
    } catch (e) {
        global.console.error(e);
        yield put(setAppLoaded(e.message));
    }
}
