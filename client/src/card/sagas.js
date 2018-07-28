import { takeEvery } from 'redux-saga/effects';
import { CARD_PLAYED } from './ducks';

import { wsSend, CARD_PLAYED_SERVER_WS } from '../technical/websocket';

function* cardPlayed({ card }) {
    global.console.log('New card played', card);
    yield wsSend(CARD_PLAYED_SERVER_WS, { card });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(CARD_PLAYED, cardPlayed);
}
