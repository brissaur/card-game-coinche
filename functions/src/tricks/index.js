import * as functions from 'firebase-functions';
import { emptyCollection } from '../common/collection';

import { getTableById, COLLECTION_NAME as tableCollectionName, nextPlayerPlusPlus } from '../tables/index';
import { getRoundsCollection } from '../rounds';
import { getPlayersOnTable, getPlayersCollection } from '../players';
import { dealCards } from '../players/business';
import {getCardsPlayedCollection} from "../cardsPlayed";
import { updateCurrentPlayerId, getCurrentAnnounce, MODE_ANNOUNCE } from "../tables";
import { selectWinnerOfTrick } from "../cardsPlayed/business";

const COLLECTION_NAME = 'tricks';

/**
 *
 * @param tableId
 */
export const getTricksCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
export const getTricksOnTable = async (tableId) => {
    const tricks = [];
    const tricksRef = getTricksCollection(tableId);
    await tricksRef
        .get()
        .then((snapshot) => {
            snapshot.forEach((trick) => {
                tricks.push(trick.data());
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return tricks;
};

/**
 * @dataProvider addTrick({playerId: '3k13yBuPHp8IRDqhtEq6', cardId: '8H'}, {params: {tableId: 'ZGbsZgB4MPaJR9AJRka1', trickId: 'REBs7d7uNgLnWTmYHn5U'}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addTrick = functions.firestore.document(`${tableCollectionName}/{tableId}/${COLLECTION_NAME}/{trickId}`).onCreate(async (snap, context) => {
    const tableId = context.params.tableId;

    const tricks = await getTricksOnTable(tableId);

    // empty cardsPlayed
    await emptyCollection(getCardsPlayedCollection(tableId));

    if (tricks.length === 8) {
        // add new round
        const roundsRef = getRoundsCollection(tableId);
        await roundsRef.add({ ...tricks });

        // => remove tricks

        await emptyCollection(getTricksCollection(tableId));

        // => next round
        // deal cards
        const players = await getPlayersOnTable(tableId);
        const playersWithCards = dealCards(players);
        const playersRef = getPlayersCollection(tableId);

        await playersWithCards.forEach(async (player) => {
            playersRef.doc(player.id).update({ cards: player.cards });
        });
        // update next player, dealer, mode
        const fbTableRef = getTableById(tableId);
        const nextDealer = await fbTableRef.then(snapshot => snapshot.data().firstPlayerId);
        const nextPlayer = await nextPlayerPlusPlus(tableId, nextDealer);
        await fbTableRef.update(
            {
                mode: MODE_ANNOUNCE,
                firstPlayerId: nextPlayer,
                currentPlayerId: nextPlayer,
            },
            { merge: true },
        );
    }
});
