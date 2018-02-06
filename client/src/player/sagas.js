import { call, put, takeEvery } from 'redux-saga/effects';
import {
    PLAYER_CONNECT_ACTION_SUCCEED,
    PLAYER_CONNECT_ACTION_FAIL,
    SET_PLAYERNAME_ACTION,
    PLAYER_CONNECT_ACTION,
    JOIN_PLAYER_TO_TABLE_ACTION,
    setPlayerName,
} from './duck';

import db from '../api/init';
import { setAppLoaded } from '../bootstrap/duck';

export function* registerPlayer() {
    // eslint-disable-next-line no-alert
    const name = prompt('Hey! What is your name?');

    if (!name) {
        throw new Error('You need to be logged in to access coinche games.');
    }

    const document = yield db.collection('players').add({
        firstname: name,
        isFakePlayer: false
    });

    yield put(setPlayerName(name, document.id));
    yield put(setAppLoaded());
}

function* connectPlayer() {
    try {
        const playerDocument = yield call(registerPlayer);
        yield put({
            type: PLAYER_CONNECT_ACTION_SUCCEED,
            id: playerDocument.id,
        });
    } catch (e) {
        yield put({
            type: PLAYER_CONNECT_ACTION_FAIL,
        });
        throw e;
    }
}

/**
 * Create one fakePlayer
 * @param name
 * @return {{firstname: *, isFakePlayer: boolean, id}}
 */
function* createFakePlayer(name){
    const fakePlayer = {
        firstname: name,
        isFakePlayer: true,
    };
    const result = yield db.collection('players').add(fakePlayer);

    return {
        ...fakePlayer,
        id: result.id,
    };
}

/**
 * @todo Remove that function once multiplayer feature is available
 * @return {array} of player's
 */
export function* createFakePlayers() {
    const players = [];
    for (let i = 0; i < 3; i += 1) {
        const fakePlayer = yield createFakePlayer(`robot${i + 1}`);
        players.push(fakePlayer);
    }

    return players;
}

function* playerSaga() {
    yield takeEvery(SET_PLAYERNAME_ACTION, setPlayerName);
    yield takeEvery(PLAYER_CONNECT_ACTION, connectPlayer);
    yield takeEvery(JOIN_PLAYER_TO_TABLE_ACTION, connectPlayer);
}

export default playerSaga;
