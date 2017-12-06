import { put } from 'redux-saga/effects';

import db from '../api/init';
import { setUserName } from '../users/duck';
import { setAppLoaded } from '../bootstrap/duck';

export default function* initAppSagas() {
    try {
        // eslint-disable-next-line no-alert
        const name = prompt('Hey! What is your name?');

        if (!name) {
            throw new Error('You need to be logged in to access coinche games.');
        }

        const document = yield db.collection('users').add({
            firstname: name,
        });
        console.log(document)
        yield put(setUserName(name, document.id));
        yield put(setAppLoaded());
    } catch (e) {
        yield put(setAppLoaded(e.message));
    }
}
