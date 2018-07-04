import * as functions from 'firebase-functions';
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
}

/**
 * @dataProvider addPlayer({id: 'XXXXXX'})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addPlayer = functions.firestore.document('tables/{tableId}/players/{playerId}').onCreate(onAddPlayer);
