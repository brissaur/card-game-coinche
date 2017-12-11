import { takeEvery } from 'redux-saga/effects';
import { CARD_PLAYED } from './ducks';

function cardPlayed(card) {
    global.console.log('New card played', card);
}

export function* watchers() {
    yield takeEvery(CARD_PLAYED, cardPlayed);
}
