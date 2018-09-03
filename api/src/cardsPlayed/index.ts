import { emptyCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus } from '../tables';
import { getTricksCollection } from '../tricks';
import { ICard } from './model';
import { QuerySnapshot } from '@google-cloud/firestore';
import {IMessage} from "../websocket/types";

const COLLECTION_NAME = 'cardsPlayed';

export const getCardsPlayedCollection = (tableId: string) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

const saveCardPlayed = (tableId: string, cardPlayed: ICard) => {
    return getCardsPlayedCollection(tableId).add(cardPlayed);
};

/**
 *
 * @param tableId
 */
export const getCardsPlayedOnTable = async (tableId: string) => {
    const cardsPlayed: ICard[] = [];
    const cardsPlayedRef = getCardsPlayedCollection(tableId);
    await cardsPlayedRef
        .get()
        .then((snapshot: QuerySnapshot) => {
            snapshot.forEach((cardPlayed) => {
                cardsPlayed.push(cardPlayed.data() as ICard);
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return cardsPlayed;
};

const onAddCardPlayed = async (message: IMessage) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;

    await saveCardPlayed(tableId, eventData);

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

// wss.on('', (message: IMessage) => {
//     return onAddCardPlayed(message);
//});