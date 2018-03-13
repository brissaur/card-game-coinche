import * as functions from 'firebase-functions';
import { getPlayersOnTable } from '../players/index';
import { getTableById, COLLECTION_NAME as tableCollectionName } from '../tables/index';
import { computeNextPlayerAfterTrick } from './business';
import { getRoundsCollection } from '../rounds';

const COLLECTION_NAME = 'tricks';

/**
 *
 * @param tableId
 */
export const getTricksCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
const getTricksOnTable = async (tableId) => {
    const tricks = [];
    const tricksRef = getTricksCollection(tableId);
    await tricksRef.get()
        .then((snapshot) => {
            snapshot.forEach((trick) => {
                tricks.push(trick.data());
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return tricks;
};

/**
 * @dataProvider addCardPlayed({playerId: 'XXXXXX', cardId: 'AH'})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addTrick = functions.firestore.document(`${tableCollectionName}/{tableId}/${COLLECTION_NAME}/{trickId}`).onCreate(async (event) => {
    const tableId = event.params.tableId;

    const tricks = await getTricksOnTable(tableId);

    if (tricks.length === 8) {
        // add new round
        const roundsRef = getRoundsCollection(tableId);
        roundsRef.add({ ...tricks });
    }

    return event;
});
