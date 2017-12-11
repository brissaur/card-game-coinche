import { call, select } from 'redux-saga/effects';
import db from '../api/init';
import { createFakePlayers } from '../player/sagas';
import { getPlayerId } from '../player/selectors';

/**
 * Return a "table" document
 * @param tableId
 * @returns {*}
 */
export function* getTable(tableId) {
    return yield db.collection('tables').doc(tableId);
}

export function* createTableAndAddPlayerToTable() {
    const playersId = yield call(createFakePlayers);
    // Add current player Id to other ID
    playersId.push(yield select(getPlayerId));

    const players = playersId.map(playerId => ({
        id: playerId,
    }));

    yield db.collection('tables').add({
        players,
    });
}
