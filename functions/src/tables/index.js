import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getPlayersOnTable, getPlayersCollection } from '../players/index';
import { getCardsPlayedCollection, getCardsPlayedOnTable } from '../cardsPlayed';
import { performAnnounce } from '../announces';
import { computeNextPlayerForTrick } from './business';
import { possibleCards, Card } from '../common/';

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
exports.updateTable = functions.firestore.document(`${COLLECTION_NAME}/{tableId}`).onUpdate(async (change, context) => {
    const tableId = context.params.tableId;
    const eventData = change.after.data();
    const currentPlayerId = eventData.currentPlayerId;

    const players = await getPlayersOnTable(tableId);
    const currentPlayer = players.find(player => player.id === currentPlayerId);

    if (currentPlayer.isFakePlayer) {
        if (eventData.mode === 'play') {
            const cardsPlayedRef = getCardsPlayedCollection(tableId);
            const cardsPlayed = await getCardsPlayedOnTable(tableId);
            const trump = eventData.currentAnnounce.announce.slice(-1);
            const cards = possibleCards(
                trump,
                { ...currentPlayer, cards: currentPlayer.cards.map(cardId => new Card(cardId)) },
                cardsPlayed.map(({ cardId }) => new Card(cardId)),
            );

            const nextCardPlayed = cards[0].id;

            await cardsPlayedRef.add({
                playerId: currentPlayerId,
                cardId: nextCardPlayed,
            });

            const playersRef = getPlayersCollection(tableId);
            await playersRef.doc(currentPlayerId).update({ cards: currentPlayer.cards.filter(c => c !== nextCardPlayed) });
        } else {
            await performAnnounce(tableId, currentPlayerId);
        }
    }
});
