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
    });

    yield put(setPlayerName(name, document.id));
    yield put(setAppLoaded());
}

function* connectPlayer() {
    try {
        const playerDocument = yield call(registerPlayer);
        yield put({
            type: PLAYER_CONNECT_ACTION_SUCCEED,
            id: playerDocument.id
        });

    } catch (e) {
        yield put({
            type: PLAYER_CONNECT_ACTION_FAIL,
        });
        throw e;
    }
}

/**
 * @todo Remove that function once multiplayer feature is available
 * @return {array} of player's ID created
 */
export function* createFakePlayers(){
    const playersId = [];
    let result;
    result = yield db.collection('players').add({
        firstname: 'robot1',
    });
    playersId.push(result.id);

    result = yield db.collection('players').add({
        firstname: 'robot2',
    });
    playersId.push(result.id);

    result = yield db.collection('players').add({
        firstname: 'robot3',
    });
    playersId.push(result.id);

    return playersId;
}

/*
 Starts fetchPlayer on each dispatched `PLAYER_FETCH_REQUESTED` action.
 Allows concurrent fetches of player.
 */
function* playerSaga() {
    yield takeEvery(SET_PLAYERNAME_ACTION, setPlayerName);
    yield takeEvery(PLAYER_CONNECT_ACTION, connectPlayer);
    yield takeEvery(JOIN_PLAYER_TO_TABLE_ACTION, connectPlayer);
}

export default playerSaga;
