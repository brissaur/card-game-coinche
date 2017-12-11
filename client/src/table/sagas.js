import db from '../api/init';
import { call, select } from 'redux-saga/effects';
import { createFakeUsers, joinUsersToTable } from '../user/sagas';
import { getUserId } from '../user/selectors';

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

export function* createTableAndAddUserToTable() {
    const tableDocument = yield call(createTable);
    const usersId = yield call(createFakeUsers);
    // // Add current user Id to other ID
    usersId.push(yield select(getUserId));
    // // Join users to table. This should trigger an event on function side to deal card
    yield call(joinUsersToTable, usersId, tableDocument);
}
