import { takeEvery, select } from 'redux-saga/effects';
import db from '../api/init';

import { CARD_PLAYED } from './ducks';
import { getTableId, getPlayerCards } from '../table/selectors';
import { getPlayerId } from '../player/selectors';

function* cardPlayed({ card }) {
    global.console.log('New card played', card);
    const tableId = yield select(getTableId);
    const myPlayerId = yield select(getPlayerId);
    const myHand = yield select(getPlayerCards);

    yield db
        .collection('tables')
        .doc(tableId)
        .collection('tricks')
        .add({
            playerId: myPlayerId,
            cardId: card.id,
        });

    yield db
        .collection('tables')
        .doc(tableId)
        .collection('players')
        .doc(myPlayerId)
        .update({ cards: myHand.filter(cardId => cardId !== card.id) });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(CARD_PLAYED, cardPlayed);
}
