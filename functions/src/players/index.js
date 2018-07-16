import * as functions from 'firebase-functions';
import { getTableById, MODE_ANNOUNCE } from '../tables';
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

export const getPlayerById = async (tableId, playerId) => {
    const players = await getPlayersOnTable(tableId);

    return players.filter(player => player.id === playerId)[0];
};

/**
 *
 * @param snap
 * @param context
 * @returns {Promise<*>}
 */
async function onAddPlayer(snap, context) {
    const tableId = context.params.tableId;
    const players = await getPlayersOnTable(tableId);

    if (players.length === 4) {
        const playersRef = getPlayersCollection(tableId);
        const playersWithCards = dealCards(players);

        const promises = [];
        playersWithCards.forEach((player) => {
            promises.push(playersRef.doc(player.id).update({ cards: player.cards }));
        });
        await Promise.all(promises);
        const tableRef = getTableById(tableId);
        const firstPlayerId = players.find(searchStartPlayer).id;
        await tableRef.update(
            {
                firstPlayerId,
                currentPlayerId: firstPlayerId,
                mode: MODE_ANNOUNCE,
            },
            { merge: true },
        );
    }
}

/**
 * @dataProvider addPlayer({id: 'XXXXXX'}, {params: {tableId: 'Zidre5WkxNJZb1o0YHme', 'playerId': 'OrWsj706IArc3XuoHW9q'}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addPlayer = functions.firestore.document('tables/{tableId}/players/{playerId}').onCreate(onAddPlayer);
