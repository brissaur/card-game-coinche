import { firestore } from '../db';
import { DocumentReference, WriteResult } from "@google-cloud/firestore";
import {ITable} from './model';
import {IPlayer} from "../players/model";

export const COLLECTION_NAME = 'tables';


export const getTableById = (tableId: string): DocumentReference => {
    return firestore
        .collection(COLLECTION_NAME)
        .doc(tableId);
};

// const updateTable = async (tableId: string, table: ITable): Promise<WriteResult> => {
//     return getTableById(tableId).update(table);
// };

export async function nextPlayerPlusPlus(table: ITable, currentPlayer: IPlayer) {
    const players = table.getPlayers();
    return ;
}

// const onUpdateTable = async (message: IMessage) => {
//     const tableId = message.meta.tableId;
//     const eventData = message.payload;
//
//     await updateTable(tableId, eventData);
//
//     const currentPlayerId = eventData.currentPlayerId;
//
//     const players = await getPlayersOnTable(tableId);
//     const currentPlayer = players.find(player => player.id === currentPlayerId);
//
//     if (currentPlayer.isFakePlayer) {
//         if (eventData.mode === 'play') {
//             // const cardsPlayedRef = getCardsPlayedCollection(tableId);
//             // const cardsPlayed = await getCardsPlayedOnTable(tableId);
//             // const trump = eventData.currentAnnounce.announce.slice(-1);
//             // const cards = possibleCards(
//             //     trump,
//             //     { ...currentPlayer, cards: currentPlayer.cards },
//             //     cardsPlayed.map(({ cardId }) => new Card(cardId)),
//             // );
//             //
//             // const nextCardPlayed = cards[0].id;
//             //
//             // await cardsPlayedRef.add({
//             //     playerId: currentPlayerId,
//             //     cardId: nextCardPlayed,
//             // });
//             //
//             // const playersRef = getPlayersCollection(tableId);
//             // await playersRef.doc(currentPlayerId).update({
//             //     cards: currentPlayer.cards.filter((c: string) => c !== nextCardPlayed)
//             // });
//         } else {
//             await performAnnounce(tableId, currentPlayerId);
//         }
//     }
// };