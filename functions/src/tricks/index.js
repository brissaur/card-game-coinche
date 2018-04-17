import * as functions from 'firebase-functions';
import { emptyCollection } from '../common/collection';

import { getTableById, COLLECTION_NAME as tableCollectionName, nextPlayerPlusPlus } from '../tables/index';
import { getRoundsCollection } from '../rounds';
import { getPlayersOnTable, getPlayersCollection } from '../players';
import { dealCards } from '../players/business';

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
    await tricksRef
        .get()
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

        // => remove tricks

        await emptyCollection(getTricksCollection(tableId));

        // => next round
        // deal cards
        const players = await getPlayersOnTable(tableId);
        const playersWithCards = dealCards(players);
        const playersRef = getPlayersCollection(tableId);

        await playersWithCards.forEach(async (player) => {
            playersRef.doc(player.id).update({ cards: player.cards });
        });
        // update next player, dealer, mode
        const fbTableRef = getTableById(tableId);
        const nextDealer = await fbTableRef.then(snap => snap.data().firstPlayerId);
        const nextPlayer = await nextPlayerPlusPlus(tableId, nextDealer);
        fbTableRef.update(
            {
                mode: 'announce',
                firstPlayerId: nextPlayer,
                currentPlayerId: nextPlayer,
            },
            { merge: true },
        );
    }

    return event;
});
