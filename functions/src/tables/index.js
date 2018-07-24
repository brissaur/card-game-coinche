import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getPlayersOnTable } from '../players/index';
import { performAnnounce } from '../announces';
import { computeNextPlayerForTrick } from './business';

export const COLLECTION_NAME = 'tables';
export const MODE_ANNOUNCE = 'announce';
export const MODE_PLAY = 'play';

export const getTableById = tableId =>
    admin
        .firestore()
        .collection(COLLECTION_NAME)
        .doc(tableId);

export async function updateCurrentPlayerId(tableId, playerId) {
    const tableRef = getTableById(tableId);

    await tableRef.update(
        {
            currentPlayerId: playerId,
        },
        { merge: true },
    );
}

export async function nextPlayerPlusPlus(tableId, previousPlayerId) {
    const players = await getPlayersOnTable(tableId);
    const nextPlayer = computeNextPlayerForTrick(players, previousPlayerId);
    await updateCurrentPlayerId(tableId, nextPlayer.id);

    return nextPlayer.id;
}

/**
 * @param tableId
 * @return {Promise<*>}
 */
export async function getCurrentAnnounce(tableId) {
    const tableRef = getTableById(tableId);

    return tableRef.get().then(doc => doc.data().currentAnnounce);
}

/**
 * @param tableId
 * @return {Promise<*>}
 */
export async function getCurrentPlayerId(tableId) {
    const tableRef = getTableById(tableId);

    return tableRef.get().then(doc => doc.data().currentPlayerId);
}

/**
 *
 * @param tableId
 * @returns {Promise<*>}
 */
export async function getFirstPlayerId(tableId) {
    const tableRef = getTableById(tableId);

    return tableRef.get().then(snapshot => snapshot.data().firstPlayerId);
}

/**
 * @dataProvider updateTable({after: {currentPlayerId: 'OrWsj706IArc3XuoHW9q'}, before: {}}, {params: {tableId: 'Zidre5WkxNJZb1o0YHme'}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.updateTable = functions.firestore.document(`${COLLECTION_NAME}/{tableId}`).onUpdate(async (change, context) => {
    const tableId = context.params.tableId;
    const eventData = change.after.data();
    const currentPlayerId = eventData.currentPlayerId;

    const players = await getPlayersOnTable(tableId);
    const currentPlayer = players.find(player => player.id === currentPlayerId);

    if (eventData.mode === MODE_ANNOUNCE && currentPlayer.isFakePlayer) {
        await performAnnounce(tableId, currentPlayerId);
    }
});
