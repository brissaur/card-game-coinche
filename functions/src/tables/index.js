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

export async function nextPlayerPlusPlus(tableId, previousPlayerId) {
    const players = await getPlayersOnTable(tableId);
    const nextPlayer = computeNextPlayerForTrick(players, previousPlayerId);
    await updateCurrentPlayerId(tableId, nextPlayer.id);
}

export async function getCurrentAnnounce(tableId) {
    const tableRef = getTableById(tableId);

    return await tableRef.get().then(doc => doc.data().currentAnnounce);
}

export async function getCurrentPlayerId(tableId){
    const tableRef = getTableById(tableId);

    return await tableRef.get().then(doc => doc.data().currentPlayerId);
}

export async function updateCurrentPlayerId(tableId, playerId){
    const tableRef = getTableById(tableId);
    console.log('updateCurrentPlayerId', {
        currentPlayerId: playerId,
    });
    await tableRef.update(
        {
            currentPlayerId: playerId,
        },
        { merge: true },
    );
}

/**
 * @dataProvider updateTable({after: {currentPlayerId: 'OrWsj706IArc3XuoHW9q'}, before: {}}, {params: {tableId: 'Zidre5WkxNJZb1o0YHme'}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.updateTable = functions.firestore.document(`${COLLECTION_NAME}/{tableId}`).onUpdate(async (change, context) => {
    console.log('updateTable called');
    console.log('before', change.before.data());
    console.log('after', change.after.data());
    console.log('context', context);
    const tableId = context.params.tableId;
    const eventData = change.after.data();
    const currentPlayerId = eventData.currentPlayerId;

    const players = await getPlayersOnTable(tableId);
    const currentPlayer = players.find(player => player.id === currentPlayerId);

    if (eventData.mode === MODE_ANNOUNCE && currentPlayer.isFakePlayer) {
        await performAnnounce(tableId, currentPlayerId);
    }
});
