import * as functions from 'firebase-functions';
import { getTableById } from '../tables/index';
import { dealCards, searchStartPlayer } from './business';
import * as admin from "firebase-admin";

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
    await playersRef.get().then((snapshot) => {
            snapshot.forEach((trick) => {
                players.push(trick.data());
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
 * @param event
 * @returns {Promise<*>}
 */
async function onAddPlayer(event) {
    const tableId = event.params.tableId;
    const players = await getPlayersOnTable(tableId);

    if (players.length === 4) {
        const playersRef = getPlayersCollection(tableId);
        const playersWithCards = dealCards(players);

        playersWithCards.forEach((player) => {
            playersRef.doc(player.id).update({ cards: player.cards });
        });
        const tableRef = getTableById(tableId);
        tableRef.update({
            general: {
                currentPlayerId: players.filter(searchStartPlayer).id,
            },
        });
    }

    return event;
}

/**
 * @dataProvider addPlayer({id: 'XXXXXX'})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addPlayer = functions.firestore.document('tables/{tableId}/players/{playerId}').onCreate(onAddPlayer);