import db from '../api/init';
import { call, select } from 'redux-saga/effects';
import { createFakePlayers, joinPlayersToTable } from '../player/sagas';
import { getPlayerId } from '../player/selectors';

/**
 * Create a new "table" document (empty)
 * @returns {*}
 */
export function* createTable(){
    // create empty document
    return yield db.collection('tables').add({});
}

/**
 * Return a "table" document
 * @param tableId
 * @returns {*}
 */
export function* getTable(tableId) {
    return yield db.collection('tables').doc(tableId);
}

export function* createTableAndAddPlayerToTable() {
    const tableDocument = yield call(createTable);
    const playersId = yield call(createFakePlayers);
    // Add current player Id to other ID
    playersId.push(yield select(getPlayerId));
    // // Join players to table. This should trigger an event on function side to deal card
    yield call(joinPlayersToTable, playersId, tableDocument);
}
