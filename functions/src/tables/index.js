import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getPlayersOnTable, getPlayersCollection } from '../players/index';
import { getCardsPlayedCollection } from '../cardsPlayed';
import { performAnnounce } from '../announces';
import { computeNextPlayerForTrick } from './business';

export const COLLECTION_NAME = 'tables';

export const getTableById = tableId =>
    admin
        .firestore()
        .collection(COLLECTION_NAME)
        .doc(tableId);

export async function nextPlayerPlusPlus(tableId, previousPlayerId) {
    const players = await getPlayersOnTable(tableId);
    const nextPlayer = computeNextPlayerForTrick(players, previousPlayerId);
    const tableRef = getTableById(tableId);
    tableRef.update(
        {
            currentPlayerId: nextPlayer.id,
        },
        { merge: true },
    );
}

/**
 * @dataProvider updateTable({after: {currentPlayerId: 'V32GHS3W8yCxvpepFbgF'}, before: {}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.updateTable = functions.firestore.document(`${COLLECTION_NAME}/{tableId}`).onUpdate(async (event) => {
    const tableId = event.params.tableId;
    const eventData = event.data.data();
    const currentPlayerId = eventData.currentPlayerId;

    const players = await getPlayersOnTable(tableId);
    const currentPlayer = players.find(player => player.id === currentPlayerId);

    if (currentPlayer.isFakePlayer) {
        if (eventData.mode === 'play') {
            const cardsPlayedRef = getCardsPlayedCollection(tableId);
            cardsPlayedRef.add({
                playerId: currentPlayerId,
                cardId: currentPlayer.cards[0],
            });
            const playersRef = getPlayersCollection(tableId);
            playersRef.doc(currentPlayerId).update({ cards: currentPlayer.cards.slice(1) });
        } else {
            performAnnounce(tableId, currentPlayerId);
        }
    }
});
