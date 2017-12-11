import { call, put, takeEvery } from 'redux-saga/effects';
import {
    USER_CONNECT_ACTION_SUCCEED,
    USER_CONNECT_ACTION_FAIL,
    SET_USERNAME_ACTION,
    USER_CONNECT_ACTION,
    JOIN_USER_TO_TABLE_ACTION,
    setUserName,
} from './duck';

import db from '../api/init';
import { setAppLoaded } from '../bootstrap/duck';

export function* registerUser() {
    // eslint-disable-next-line no-alert
    const name = prompt('Hey! What is your name?');

    if (!name) {
        throw new Error('You need to be logged in to access coinche games.');
    }

    const document = yield db.collection('users').add({
        firstname: name,
    });

    yield put(setUserName(name, document.id));
    yield put(setAppLoaded());
}

function* connectUser() {
    try {
        const userDocument = yield call(registerUser);
        yield put({
            type: USER_CONNECT_ACTION_SUCCEED,
            id: userDocument.id
        });

    } catch (e) {
        yield put({
            type: USER_CONNECT_ACTION_FAIL,
        });
        throw e;
    }
}

/**
 * @todo Remove that function once multiplayer feature is available
 * @return {array} of user's ID created
 */
export function* createFakeUsers(){
    const usersId = [];
    let result;
    result = yield db.collection('users').add({
        firstname: 'robot1',
    });
    usersId.push(result.id);

    result = yield db.collection('users').add({
        firstname: 'robot2',
    });
    usersId.push(result.id);

    result = yield db.collection('users').add({
        firstname: 'robot3',
    });
    usersId.push(result.id);

    return usersId;
}

/**
 * @todo For now we create systematically a new table with users
 * @returns {*}
 * @param {array} usersId
 * @param {Object} tableDocument
 */
export function* joinUsersToTable(usersId, tableDocument){
    const users = usersId.map((userId) => {
        return {
            id: userId
        }
    });
    return yield db.collection('tables').doc(tableDocument.id).update({
        users: users,
    });
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
function* usersSaga() {
    yield takeEvery(SET_USERNAME_ACTION, setUserName);
    yield takeEvery(USER_CONNECT_ACTION, connectUser);
    yield takeEvery(JOIN_USER_TO_TABLE_ACTION, connectUser);
}

export default usersSaga;
