import { emptyCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus } from '../tables/index';
import { getTricksCollection } from '../tricks/index';
import { ICardPlayed } from './types';

const COLLECTION_NAME = 'cardsPlayed';

export const getCardsPlayedCollection = (tableId: string) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

const saveCardPlayed = (tableId: string, cardPlayed: ICardPlayed) => {
    return getCardsPlayedCollection(tableId).add(cardPlayed);
};

/**
 *
 * @param tableId
 */
export const getCardsPlayedOnTable = async (tableId: string) => {
    const cardsPlayed: ICardPlayed[] = [];
    const cardsPlayedRef = getCardsPlayedCollection(tableId);
    await cardsPlayedRef
        .get()
        .then((snapshot: QuerySnapshot) => {
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

const addCardPlayed = async (message) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;

    await saveCardPlayed(eventData);

    const cardsPlayed = await getCardsPlayedOnTable(tableId);

    if (cardsPlayed.length >= 4) {
        // add a trick with cardsPlayed
        const tricksCollection = getTricksCollection(tableId);
        await tricksCollection.add({ ...cardsPlayed });
        // empty cardsPlayed
        await emptyCollection(getCardsPlayedCollection(tableId));
    }

    await nextPlayerPlusPlus(tableId, eventData.playerId);
};