import { put, call } from 'redux-saga/effects';
import { registerPlayer } from '../player/sagas';
import { createTableAndAddPlayerToTable, watchOnSnapshot } from '../table/sagas';
import { setAppLoaded } from '../bootstrap/duck';

export default function* initAppSagas() {
    try {
        yield call(registerPlayer);
        yield call(createTableAndAddPlayerToTable);
        yield call(watchOnSnapshot);

        yield put(setAppLoaded());
    } catch (e) {
        global.console.error(e);
        yield put(setAppLoaded(e.message));
    }
}
