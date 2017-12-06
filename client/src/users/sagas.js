import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
    SET_USERNAME_ACTION_SUCCEED,
    USER_CONNECT_ACTION_SUCCEED,
    USER_CONNECT_ACTION_FAIL,
    SET_USERNAME_ACTION_FAIL,
    SET_USERNAME_ACTION,
    USER_CONNECT_ACTION,
} from './duck';

import { getUserName } from './selectors';

// DEPRECATED
export function* userConnect(username) {
    global.console.log('DELETE THIS PLEASE')
}

function* connectUser() {
    try {
        const username = yield select(getUserName);
        yield call(userConnect, username);
        yield put({
            type: USER_CONNECT_ACTION_SUCCEED,
        });
    } catch (e) {
        yield put({
            type: USER_CONNECT_ACTION_FAIL,
        });
    }
}

function* setUserName(action) {
    try {
        yield put({
            type: SET_USERNAME_ACTION_SUCCEED,
            username: action.payload.username,
        });
    } catch (e) {
        yield put({
            type: SET_USERNAME_ACTION_FAIL,
            message: e.message,
        });
    }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
function* usersSaga() {
    yield takeEvery(SET_USERNAME_ACTION, setUserName);
    yield takeEvery(USER_CONNECT_ACTION, connectUser);
}

export default usersSaga;
