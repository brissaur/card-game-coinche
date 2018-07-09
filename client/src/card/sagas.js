import { takeEvery, select, put } from 'redux-saga/effects';
import db from '../api/init';

import { CARD_PLAYED } from './ducks';
import { getTableId, getPlayerCards } from '../table/selectors';
import { REMOVE_CARD_ID_IN_HAND } from '../table/ducks';
import { getPlayerId } from '../player/selectors';

import {TABLE_COLLECTION, CARD_PLAYED_COLLECTION, PLAYERS_COLLECTION} from '../api/constants';

const initialState = {};

function* cardPlayed({ card }) {
    global.console.log('New card played', card);
    const tableId = yield select(getTableId);
    const myPlayerId = yield select(getPlayerId);
    const myHand = yield select(getPlayerCards);

    yield db
        .collection(TABLE_COLLECTION)
        .doc(tableId)
        .collection(CARD_PLAYED_COLLECTION)
        .add({
            playerId: myPlayerId,
            cardId: card.id,
        });

    // This should not be done (function do it automatically
    // yield db
    //     .collection(TABLE_COLLECTION)
    //     .doc(tableId)
    //     .collection(PLAYERS_COLLECTION)
    //     .doc(myPlayerId)
    //     .update({ cards: myHand.filter(cardId => cardId !== card.id) });

    // This should be done instead (but do not work)
    //yield put({ type: REMOVE_CARD_ID_IN_HAND, card});
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(CARD_PLAYED, cardPlayed);
}
