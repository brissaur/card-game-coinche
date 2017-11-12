import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as duck from './duck';

function* connectUser() {
    try {
        const username = yield select(duck.getUserName);
        yield call(duck.userConnect, username);
        yield put({
            type: duck.USER_CONNECT_ACTION_SUCCEED,
        });
    } catch (e) {
        yield put({
            type: duck.USER_CONNECT_ACTION_FAIL,
        });
    }
}

function* setUserName(action) {
    try {
        yield put({
            type: duck.SET_USERNAME_ACTION_SUCCEED,
            username: action.payload.username,
        });
    } catch (e) {
        yield put({
            type: duck.SET_USERNAME_ACTION_FAIL,
            message: e.message,
        });
    }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
function* usersSaga() {
    yield takeEvery(duck.SET_USERNAME_ACTION, setUserName);
    yield takeEvery(duck.USER_CONNECT_ACTION, connectUser);
}

export default usersSaga;
