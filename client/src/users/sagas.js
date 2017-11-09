import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import db from '../api/init'
import * as duck from './duck';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//     try {
//         const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//     } catch (e) {
//         yield put({type: "USER_FETCH_FAILED", message: e.message});
//     }
// }

function* saveUser () {

    try{
        const result = yield db.collection("users").doc("toto_arnaud_test").set({
            firstname: "toto_arnaud_test"
        })
        console.log('success !!!')
        // yield put({type: "USER_CONNECT_SUCCEEDED", user: user})
    }catch (e){
        console.error('error !!!', e)
        // yield put({type: "USER_CONNECT_FAILED", message: e.message})
    }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
function* usersSaga() {
    yield takeEvery(duck.USER_CONNECT_ACTION, saveUser);
}

export default usersSaga;