import { takeEvery, take } from 'redux-saga/effects'

// example saga that logs an action
function* logAction(action) {
    global.console.log('New action', action);
}

export default function* rootSaga() {
  yield take('TEST_ACTION');
  global.console.log('New action arrived!');
}
