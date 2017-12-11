import { put, call } from 'redux-saga/effects';
import { registerUser } from '../user/sagas';
import { createTableAndAddUserToTable } from '../table/sagas';
import { setAppLoaded } from '../bootstrap/duck';

export default function* initAppSagas() {
    try {
        yield call(registerUser);
        yield call(createTableAndAddUserToTable);

        yield put(setAppLoaded());
    } catch (e) {
        yield put(setAppLoaded(e.message));
    }
}

