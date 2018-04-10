import * as functions from 'firebase-functions';
import { getTableById, nextPlayerPlusPlus, COLLECTION_NAME as tableCollectionName } from '../tables/index';

import { announceIA } from './business';

const COLLECTION_NAME = 'announces';

export const getAnnouncesCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

export function performAnnounce(tableId, playerId) {
    getAnnouncesCollection(tableId).add({
        playerId,
        announce: announceIA(),
    });
    // TODO: last announce?
    nextPlayerPlusPlus(tableId, playerId);
}

/**
 * @dataProvider addCardPlayed({playerId: '2GQLBAuwQiPlDAlAMmVT', card: 'AH'})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.onAnnounce = functions.firestore.document(`${tableCollectionName}/{tableId}/${COLLECTION_NAME}/{announceId}`).onCreate(async (event) => {
    const tableId = event.params.tableId;
    const playerId = event.data.data().playerId;

    await nextPlayerPlusPlus(tableId, playerId);

    return event;
});
