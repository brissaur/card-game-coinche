import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getPlayersOnTable, getPlayersCollection } from '../players/index';
import { getCardsPlayedCollection } from '../cardsPlayed';

export const COLLECTION_NAME = 'tables';

export const getTableById = tableId => admin.firestore().collection(COLLECTION_NAME).doc(tableId);
/**
 * @dataProvider updateTable({after: {general: {currentPlayerId: 'V32GHS3W8yCxvpepFbgF'}}, before: {}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.updateTable = functions.firestore.document(`${COLLECTION_NAME}/{tableId}`).onUpdate(async (event) => {
    const tableId = event.params.tableId;
    const currentPlayerId = event.data.data().general.currentPlayerId;

    const players = await getPlayersOnTable(tableId);
    const currentPlayer = players.find(player => player.id === currentPlayerId);

    if (currentPlayer.isFakePlayer) {
        const cardsPlayedRef = getCardsPlayedCollection(tableId);
        cardsPlayedRef.add({
            playerId: currentPlayerId,
            cardId: currentPlayer.cards[0],
        });
        const playersRef = getPlayersCollection(tableId);
        playersRef.doc(currentPlayerId).update({ cards: currentPlayer.cards.slice(1) });
    }
});
