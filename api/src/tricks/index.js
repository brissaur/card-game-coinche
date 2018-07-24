import { emptyCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus } from '../tables/index';
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

const saveTrick = async (tableId, trick) => {
    return getTricksCollection(tableId).add(trick);
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

const addTrick = async (message) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;

    await saveTrick(tableId, eventData);

    const tricks = await getTricksOnTable(tableId);

    if (tricks.length === 8) {
        // add new round
        const roundsRef = getRoundsCollection(tableId);
        await roundsRef.add({ ...tricks });

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
        const nextDealer = await fbTableRef.then(snapshot => snapshot.data().firstPlayerId);
        const nextPlayer = await nextPlayerPlusPlus(tableId, nextDealer);
        await fbTableRef.update(
            {
                mode: 'announce',
                firstPlayerId: nextPlayer,
                currentPlayerId: nextPlayer,
            },
            { merge: true },
        );
    }
};