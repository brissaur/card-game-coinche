import * as functions from 'firebase-functions';
import { getTableById, nextPlayerPlusPlus, COLLECTION_NAME as tableCollectionName } from '../tables';

import { announceIA, shouldStopAnnounces } from './business';

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
    const announces = await getAnnouncesCollection(tableId)
        .get()
        .then(createAnnouncesFromSnapshot);

    return announces;
}

export function performAnnounce(tableId, playerId) {
    getAnnouncesCollection(tableId).add({
        playerId,
        announce: announceIA(),
    });
}

/**
 * @dataProvider addCardPlayed({playerId: '2GQLBAuwQiPlDAlAMmVT', card: 'AH'})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.onAnnounce = functions.firestore
    // @TODO: fix tableCollectionName=undefined
    .document(`${tableCollectionName || 'tables'}/{tableId}/${COLLECTION_NAME}/{announceId}`)
    .onCreate(async (event) => {
        // @ TODO: tables en dur
        const tableId = event.params.tableId;
        const playerId = event.data.data().playerId;

        if (shouldStopAnnounces(await getAnnounces(tableId))) {
            const fbTable = getTableById(tableId);
            const firstPlayerId = await fbTable.get().then(doc => doc.data().firstPlayerId);

            fbTable.update(
                {
                    currentPlayerId: firstPlayerId,
                    mode: 'play',
                },
                { merge: true },
            );
        } else {
            await nextPlayerPlusPlus(tableId, playerId);
        }

        return event;
    });
