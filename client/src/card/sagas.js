import { takeEvery, select } from 'redux-saga/effects';
import db from '../api/init';

import { CARD_PLAYED } from './ducks';
import { getTableId } from '../table/selectors';
import { getPlayerId } from '../player/selectors';

function* cardPlayed({ card }) {
    global.console.log('New card played', card);
    const tableId = yield select(getTableId);
    const document = yield db.collection('tables').doc(tableId);

    const myPlayerId = yield select(getPlayerId);
    const snap = yield document.get();
    const data = snap.data();
    const me = data.players.find(player => player.id === myPlayerId);
    const newHand = me.cards.filter(id => id !== card.id);

    yield document.update({
        trick: [
            ...data.trick,
            {
                playerId: myPlayerId,
                cardId: card.id,
            },
        ],
        players: [
            ...data.players.filter(({ id }) => id !== myPlayerId),
            {
                id: myPlayerId,
                cards: newHand,
            },
        ],
    });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(CARD_PLAYED, cardPlayed);
}
