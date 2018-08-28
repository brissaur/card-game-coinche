import { takeEvery, call, all, fork } from 'redux-saga/effects';

import initAppSaga from './bootstrap/sagas';
import { watchers as cardWatchers } from './card/sagas';
import { watchers as announceWatchers } from './announce/sagas';
import { watchers as tableWatchers } from './table/sagas';
import { watchers as chatWatchers } from './chat/sagas';

// example saga that logs an action
// eslint-disable-next-line
function* logAction(action) {
    global.console.log('New action', action);
}

export default function* rootSaga() {
    yield all([
        takeEvery('*', logAction),
        fork(cardWatchers),
        fork(announceWatchers),
        fork(tableWatchers),
        fork(chatWatchers),
        call(initAppSaga),
    ]);
}
