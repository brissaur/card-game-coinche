import { put, fork } from 'redux-saga/effects';
import { setAppLoaded } from './duck';
import { initializeWebSocket } from '../technical/websocket/saga';
import { watchers as tableWatcher } from '../table/sagas';

export default function* initAppSagas() {
    try {
        yield fork(initializeWebSocket);
        yield fork(tableWatcher);
        yield put(setAppLoaded());
    } catch (e) {
        global.console.error(e);
        yield put(setAppLoaded(e.message));
    }
}
