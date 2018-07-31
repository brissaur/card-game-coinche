import { put, takeEvery } from 'redux-saga/effects';
import { setPlayerName } from './duck';

import { setAppLoaded } from '../bootstrap/duck';
import { WS_PLAYER_CONNECTION } from '../technical/websocket/actions';

function* connectPlayer({ payload }) {
    yield put(setPlayerName(payload.playerId, payload.tableId));
    yield put(setAppLoaded());
}

function* playerSaga() {
    yield takeEvery(WS_PLAYER_CONNECTION, connectPlayer);
}

export default playerSaga;
