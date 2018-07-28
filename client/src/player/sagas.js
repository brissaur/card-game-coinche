import { put, takeEvery } from 'redux-saga/effects';
import { setPlayerName } from './duck';

import { setAppLoaded } from '../bootstrap/duck';
import { WS_PLAYER_CONNECTION } from '../technical/websocket/actions';

function* connectPlayer({ payload }) {
    console.log('connectPlayer', payload);
    // const { payload } = yield take(WS_PLAYER_CONNECTION);

    yield put(setPlayerName(payload.name, payload.table_id));
    yield put(setAppLoaded());
}

function* playerSaga() {
    yield takeEvery(WS_PLAYER_CONNECTION, connectPlayer);
}

export default playerSaga;
