import { takeEvery, select, put } from 'redux-saga/effects';
import { updateTrick, updatePlayers, updateAnnounces } from './ducks';
import { getTrick, getAnnounces, getPlayers } from './selectors';
import { WS_CARD_PLAYED, WS_NEW_ANNOUNCE, WS_NEW_PLAYER } from '../technical/websocket/actions';

function* onCardPlayed({ payload }) {
    const trick = yield select(getTrick);
    const res = trick.concat([payload.card]);

    yield put(updateTrick(res));
}

function* onNewAnnounce({ payload }) {
    const announces = yield select(getAnnounces);
    const res = announces.concat([payload.announce]);

    yield put(updateAnnounces(res));
}

function* onNewPlayer({ payload }) {
    const players = yield select(getPlayers);
    const res = players.concat([payload.player]);

    yield put(updatePlayers(res));
}

export function* watchers() {
    yield takeEvery(WS_CARD_PLAYED, onCardPlayed);
    yield takeEvery(WS_NEW_ANNOUNCE, onNewAnnounce);
    yield takeEvery(WS_NEW_PLAYER, onNewPlayer);
}
