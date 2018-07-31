import { takeEvery, select, put } from 'redux-saga/effects';
import { updateTrick, updatePlayers, updateAnnounces, updateHand, updateGeneral } from './ducks';
import { getTrick, getAnnounces, getPlayers } from './selectors';
import {
    WS_CARD_PLAYED,
    WS_NEW_ANNOUNCE,
    WS_NEW_PLAYER,
    WS_GAME_START,
    WS_DEAL_CARDS,
    WS_ACTIVE_PLAYER,
    WS_ROUND_MODE,
} from '../technical/websocket/actions';

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

function* onGameStart({ payload }) {
    const { dealerId, mode } = payload;
    yield put(updateGeneral({ dealerId, mode }));
}

function* onDealCards({ payload }) {
    yield put(updateHand(payload.cards));
}

function* onSetActivePlayer({ payload }) {
    yield put(updateGeneral({ playerId: payload.playerId }));
}

function* onSetRoundMode({ payload }) {
    yield put(updateGeneral({ mode: payload.mode }));
}

export function* watchers() {
    yield takeEvery(WS_CARD_PLAYED, onCardPlayed);
    yield takeEvery(WS_NEW_ANNOUNCE, onNewAnnounce);
    yield takeEvery(WS_NEW_PLAYER, onNewPlayer);
    yield takeEvery(WS_GAME_START, onGameStart);
    yield takeEvery(WS_DEAL_CARDS, onDealCards);
    yield takeEvery(WS_ACTIVE_PLAYER, onSetActivePlayer);
    yield takeEvery(WS_ROUND_MODE, onSetRoundMode);
}
