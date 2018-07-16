import * as functions from 'firebase-functions';
import {
    getTableById,
    COLLECTION_NAME as tableCollectionName,
    nextPlayerPlusPlus,
    getCurrentAnnounce,
    updateCurrentPlayerId,
} from '../tables';
import { getTricksCollection } from '../tricks';
import { Card, possibleCards } from '../common';
import { getPlayersCollection, getPlayerById } from '../players';
import { selectWinnerOfTrick } from './business';

const COLLECTION_NAME = 'cardsPlayed';

export const getCardsPlayedCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

/**
 *
 * @param tableId
 */
export const getCardsPlayedOnTable = async (tableId) => {
    const cardsPlayed = [];
    const cardsPlayedRef = getCardsPlayedCollection(tableId);
    await cardsPlayedRef
        .get()
        .then((snapshot) => {
            snapshot.forEach((cardPlayed) => {
                cardsPlayed.push(cardPlayed.data());
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return cardsPlayed;
};

export async function letFakePlayerPlay(tableId, currentPlayer, cardsPlayed) {
    const cardsPlayedRef = await getCardsPlayedCollection(tableId);
    const currentAnnounce = await getCurrentAnnounce(tableId);
    const currentPlayerId = currentPlayer.id;

    const cards = possibleCards(
        currentAnnounce,
        { ...currentPlayer, cards: currentPlayer.cards.map(cardId => new Card(cardId)) },
        cardsPlayed.map(({ cardId }) => new Card(cardId)),
    );

    const cardBeingPlayed = cards[0].id;

    await cardsPlayedRef.add({
        playerId: currentPlayerId,
        cardId: cardBeingPlayed,
    });
}

/**
 * @dataProvider addCardPlayed({playerId: 'sYMbFxgcsxHKgIc10rWl', card: 'AH'}, {params: {tableId: 'OPxHwsrvCNQbLSFxm5gA', cardPlayedId: 'titi'}})
 * @dataProvider addCardPlayed({playerId: '2', card: 'JH'}, {params: {tableId: 'Zidre5WkxNJZb1o0YHme', cardPlayedId: 'toto'}})
 * @dataProvider addCardPlayed({playerId: '3', card: '10H'}, {params: {tableId: 'Zidre5WkxNJZb1o0YHme', cardPlayedId: 'tata'}})
 * @dataProvider addCardPlayed({playerId: '4', card: '8H'}, {params: {tableId: 'Zidre5WkxNJZb1o0YHme', cardPlayedId: 'tete'}})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addCardPlayed = functions.firestore
    .document(`${tableCollectionName}/{tableId}/${COLLECTION_NAME}/{cardPlayedId}`).onCreate(async (snap, context) => {
        const tableId = context.params.tableId;
        const cardsPlayed = await getCardsPlayedOnTable(tableId);

        // remove card from hand which has just been played
        const playersRef = getPlayersCollection(tableId);
        const currentPlayer = await getPlayerById(tableId, snap.data().playerId);
        await playersRef.doc(snap.data().playerId)
            .update({ cards: currentPlayer.cards.filter(c => c !== snap.data().cardId) });

        if (cardsPlayed.length >= 4) {
            /** end of Trick, Select the winner * */
            const currentAnnounce = await getCurrentAnnounce(tableId);
            const winner = selectWinnerOfTrick(cardsPlayed, currentAnnounce.announce.slice(-1));
            await updateCurrentPlayerId(tableId, winner);

            // add a trick with cardsPlayed
            const tricksCollection = getTricksCollection(tableId);
            await tricksCollection.add({ ...cardsPlayed });

            return null;
        }

        const nextPlayerId = await nextPlayerPlusPlus(tableId, snap.data().playerId);

        const nextPlayer = await getPlayerById(tableId, nextPlayerId);
        if (nextPlayer.isFakePlayer) {
            await letFakePlayerPlay(tableId, nextPlayer, cardsPlayed);
        }

        return null;
    });
