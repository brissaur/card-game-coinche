import { getTableById } from '../tables/index';
import { dealCards, searchStartPlayer } from './business';

const COLLECTION_NAME = 'players';

/**
 *
 * @param tableId
 */
export const getPlayersCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

const savePlayer = (tableId, player) => {
    return getPlayersCollection(tableId).add(player);
};

/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
export const getPlayersOnTable = async (tableId) => {
    const players = [];
    const playersRef = getPlayersCollection(tableId);
    await playersRef
        .get()
        .then((snapshot) => {
            snapshot.forEach((player) => {
                players.push(player.data());
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return players;
};

const addPlayer = async (message) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;

    await savePlayer(tableId, eventData);

    const players = await getPlayersOnTable(tableId);

    if (players.length === 4) {
        const playersRef = getPlayersCollection(tableId);
        const playersWithCards = dealCards(players);

        playersWithCards.forEach(async (player) => {
            playersRef.doc(player.id).update({ cards: player.cards });
        });
        const tableRef = getTableById(tableId);
        const firstPlayerId = players.find(searchStartPlayer).id;
        await tableRef.update(
            {
                firstPlayerId,
                currentPlayerId: firstPlayerId,
                mode: 'announce',
            },
            { merge: true },
        );
    }
};
