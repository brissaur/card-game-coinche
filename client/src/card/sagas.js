import { takeEvery, select } from 'redux-saga/effects';
import db from '../api/init';

import { CARD_PLAYED } from './ducks';
import { getTableId } from '../table/selectors';

function* cardPlayed({ card }) {
    global.console.log('New card played', card);
    const tableId = yield select(getTableId);
    const document = yield db.collection('tables').doc(tableId);

    const snap = yield document.get();
    yield document.update({
        trick: [...snap.data().trick, card],
        // TODO: add an object with card.id && player.id
    });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(CARD_PLAYED, cardPlayed);
}
