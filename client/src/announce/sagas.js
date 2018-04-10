import { takeEvery, select } from 'redux-saga/effects';
import db from '../api/init';

import { ANNOUNCE_ANNOUNCED } from './ducks';
import { getTableId } from '../table/selectors';
import { getPlayerId } from '../player/selectors';

import { TABLE_COLLECTION, ANNOUNCES_COLLECTION } from '../api/constants';

function* announceAnnounced({ announce }) {
    global.console.log('New announce announced', announce);
    const tableId = yield select(getTableId);
    const myPlayerId = yield select(getPlayerId);

    yield db
        .collection(TABLE_COLLECTION)
        .doc(tableId)
        .collection(ANNOUNCES_COLLECTION)
        .add({
            playerId: myPlayerId,
            announce,
        });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(ANNOUNCE_ANNOUNCED, announceAnnounced);
}
