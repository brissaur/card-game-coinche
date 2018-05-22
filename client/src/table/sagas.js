import { call, select, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import db from '../api/init';
import {
    TABLE_COLLECTION,
    CARD_PLAYED_COLLECTION,
    PLAYERS_COLLECTION,
    ANNOUNCES_COLLECTION,
} from '../api/constants';

import { createFakePlayers } from '../player/sagas';
import { getPlayerId } from '../player/selectors';
import {
    setTableId,
    updateTrick,
    updateTableDocument,
    updatePlayers,
    updateAnnounces,
} from './ducks';
import { getTableId } from '../table/selectors';

const INITIAL_DOCUMENT = {};

/**
 * Return a "table" document
 * @param tableId
 * @returns {*}
 */
export function* getTable(tableId) {
    return yield db.collection(TABLE_COLLECTION).doc(tableId);
}

// this function creates an event channel from a given document
// Setup subscription to incoming `snapshot` events
/**
 * @doc https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md#using-the-eventchannel-factory-to-connect-to-external-events
 * @param document
 * @return DocumentSnapshot
 */
function createSnapshotChannel(documentOrCollection) {
    return eventChannel((emit) => {
        documentOrCollection.onSnapshot(emit);

        return () => {};
    });
}

export function* watchUpdateOnDocumentTable() {
    const tableId = yield select(getTableId);
    const document = yield call(getTable, tableId);
    const snapshotChannel = yield call(createSnapshotChannel, document);

    while (true) {
        const snapshot = yield take(snapshotChannel);
        yield put(updateTableDocument(snapshot.data()));
    }
}

function watchUpdateOnTableSubcollection(COLLECTION_NAME, action, snapshotTransform) {
    return function* watchUpdate() {
        const tableId = yield select(getTableId);
        const coll = yield db
            .collection(TABLE_COLLECTION)
            .doc(tableId)
            .collection(COLLECTION_NAME);

        const snapshotChannel = yield call(createSnapshotChannel, coll);

        while (true) {
            const snapshot = yield take(snapshotChannel);
            yield put(action(snapshotTransform(snapshot)));
        }
    };
}

export const watchUpdateOnCollectionPlayers = watchUpdateOnTableSubcollection(
    PLAYERS_COLLECTION,
    updatePlayers,
    snapshot => snapshot.docs.map(doc => doc.data()),
);

export const watchUpdateOnCollectionTrick = watchUpdateOnTableSubcollection(
    CARD_PLAYED_COLLECTION,
    updateTrick,
    snapshot => snapshot.docs.map(doc => doc.data()),
);

export const watchUpdateOnCollectionAnnounce = watchUpdateOnTableSubcollection(
    ANNOUNCES_COLLECTION,
    updateAnnounces,
    snapshot => snapshot.docs.map(doc => doc.data()),
);

export function* createTableAndAddPlayerToTable() {
    const meId = yield select(getPlayerId);
    // create fake player and add a position (start at 1) for each of them
    const players = (yield call(createFakePlayers))
        .map((player, idx) => ({
            ...player,
            pos: idx + 1,
        }))
        // Add current player Id to other ID
        .concat({
            id: meId,
            isFakePlayer: false,
            pos: 0,
        });

    const document = yield db.collection(TABLE_COLLECTION).add(INITIAL_DOCUMENT);
    yield put(setTableId(document.id));

    const table = yield call(getTable, document.id);
    const playerCollection = table.collection(PLAYERS_COLLECTION);
    // eslint-disable-next-line no-restricted-syntax
    for (const player of players) {
        yield playerCollection.doc(player.id).set(player);
    }

    // launch listeners
    yield fork(watchUpdateOnDocumentTable);
    yield fork(watchUpdateOnCollectionPlayers);
    yield fork(watchUpdateOnCollectionTrick);
    yield fork(watchUpdateOnCollectionAnnounce);
}
