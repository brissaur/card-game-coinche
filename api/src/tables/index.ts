import { getPlayersOnTable, getPlayersCollection } from '../players/index';
import { getCardsPlayedCollection, getCardsPlayedOnTable } from '../cardsPlayed';
import { performAnnounce } from '../announces';
import { computeNextPlayerForTrick } from './business';
import { possibleCards, Card } from '../common/';
import { firestore } from '../db/index';
import { DocumentReference, WriteResult, FieldPath, FieldValue } from "@google-cloud/firestore";
import { ITable } from './types';

export const COLLECTION_NAME = 'tables';

export const getTableById = (tableId: string): DocumentReference => {
    return firestore
        .collection(COLLECTION_NAME)
        .doc(tableId);
}

const updateTable = async (tableId: string, table: ITable): Promise<WriteResult> => {
    return getTableById(tableId).update(table);
};

export async function nextPlayerPlusPlus(tableId: string, previousPlayerId: string) {
    const players = await getPlayersOnTable(tableId);
    const nextPlayer = computeNextPlayerForTrick(players, previousPlayerId);
    const tableRef = getTableById(tableId);
    const toto = {
        currentPlayerId: nextPlayer.id
    };
    tableRef.update(
        toto,
        { merge: true },
    );
}

const onUpdateTable = async (message) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;

    await updateTable(tableId, eventData);

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
};