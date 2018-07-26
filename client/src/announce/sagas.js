import { takeEvery } from 'redux-saga/effects';

import { ANNOUNCE_ANNOUNCED } from './ducks';

import { wsSend, ANNOUNCE_SERVER_WS } from '../technical/websocket';

function* announceAnnounced({ announce }) {
    global.console.log('New announce announced', announce);
    yield wsSend(ANNOUNCE_SERVER_WS, { announce });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchers() {
    yield takeEvery(ANNOUNCE_ANNOUNCED, announceAnnounced);
}
