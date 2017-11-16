import { takeEvery } from 'redux-saga/effects';

// example saga that logs an action
// eslint-disable-next-line
function* logAction(action) {
    global.console.log('New action', action);
}

export default function* rootSaga() {
    yield takeEvery('*', logAction);
}
