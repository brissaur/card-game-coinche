import { takeEvery, call } from 'redux-saga/effects';

import initAppSaga from './bootstrap/sagas';

// example saga that logs an action
// eslint-disable-next-line
function* logAction(action) {
    global.console.log('New action', action);
}

export default function* rootSaga() {
    yield takeEvery('*', logAction);

    // init APP
    yield call(initAppSaga);
}
