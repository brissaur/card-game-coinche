import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { deleteCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus, COLLECTION_NAME as tableCollectionName, MODE_PLAY } from '../tables';
import { announceIA, shouldStopAnnounces, getBestAnnounce } from './business';

const COLLECTION_NAME = 'announces';

export const getAnnouncesCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

function createAnnouncesFromSnapshot(snapshot) {
    const announces = [];

    snapshot.forEach(doc => announces.push(doc.data()));

    return announces;
}

export async function getAnnounces(tableId) {
    return getAnnouncesCollection(tableId)
        .get()
        .then(createAnnouncesFromSnapshot);
}

export async function performAnnounce(tableId, playerId) {
    await getAnnouncesCollection(tableId).add({
        playerId,
        announce: announceIA(),
    });
}

/**
 * @dataProvider onAnnounce({playerId: 'OrWsj706IArc3XuoHW9q', card: 'AH'}, {params: {tableId: 'Zidre5WkxNJZb1o0YHme', announceId: 'ABCD'}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.onAnnounce = functions.firestore
    // @TODO: fix tableCollectionName=undefined
    .document(`${tableCollectionName || 'tables'}/{tableId}/${COLLECTION_NAME}/{announceId}`)
    .onCreate(async (snap, context) => {
        // @ TODO: tables en dur
        const tableId = context.params.tableId;
        const playerId = snap.data().playerId;

        const announces = await getAnnounces(tableId);
        if (shouldStopAnnounces(announces)) {
            const fbTable = getTableById(tableId);
            const firstPlayerId = await fbTable.get().then(doc => doc.data().firstPlayerId);

            await deleteCollection(admin.firestore(), getAnnouncesCollection(tableId));

            await fbTable.update(
                {
                    currentPlayerId: firstPlayerId,
                    currentAnnounce: getBestAnnounce(announces),
                    mode: MODE_PLAY,
                },
                { merge: true },
            );
        } else {
            await nextPlayerPlusPlus(tableId, playerId);
        }
    });
