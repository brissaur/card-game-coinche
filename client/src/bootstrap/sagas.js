import { put, call } from 'redux-saga/effects';

import db from '../api/init';
import { setUserName } from '../users/duck';
import { setAppLoaded } from '../bootstrap/duck';

function* registerUser() {
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

function* createTable() {
    // TODO: ARNAUD
}

export default function* initAppSagas() {
    try {
        yield call(registerUser);
        yield call(createTable);

        yield put(setAppLoaded());
    } catch (e) {
        yield put(setAppLoaded(e.message));
    }
}
