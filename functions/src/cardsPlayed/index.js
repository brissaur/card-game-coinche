import * as functions from 'firebase-functions';
import { getTableById, COLLECTION_NAME as tableCollectionName } from '../tables/index';
import { getPlayersOnTable } from '../players/index';
import { computeNextPlayerAfterCardPlayed } from './business';
import { getTricksCollection } from '../tricks/index';

const COLLECTION_NAME = 'cardsPlayed';

/**
 *
 * @param tableId
 */
const getCardsPlayedOnTable = (tableId) => {
    const table = getTableById(tableId);
    return table.collection(COLLECTION_NAME);
};

/**
 * @dataProvider addCardPlayed({playerId: 'XXXXXX', card: {}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addCardPlayed = functions.firestore.document(tableCollectionName+'/{tableId}/'+COLLECTION_NAME+'/{cardPlayedId}').onCreate(async (event) => {
    const tableId = event.params.tableId;
    const cardsPlayed = await getCardsPlayedOnTable(tableId);

    if (cardsPlayed.length === 4) {
        // add a trick with cardsPlayed
        const tricksCollection = getTricksCollection(tableId);
        tricksCollection.add({ ...cardsPlayed });
    } else {
        const players = await getPlayersOnTable(tableId);
        const previousPlayerId = event.data.data().playerId;
        const currentPlayer = computeNextPlayerAfterCardPlayed(players, previousPlayerId);
        const tableRef = getTableById(tableId);
        tableRef.update({
            general: {
                currentPlayerId: currentPlayer.id,
            },
        });
    }

    return event;
});