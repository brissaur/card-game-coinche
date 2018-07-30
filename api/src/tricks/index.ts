import { emptyCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus } from '../tables';
import { getRoundsCollection } from '../rounds';
import { getPlayersOnTable, getPlayersCollection } from '../players';
import { dealCards } from '../players/business';
import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import {ITrick} from "./types";
import {IMessage} from "../websocket/types";

const COLLECTION_NAME = 'tricks';

/**
 *
 * @param tableId
 */
export const getTricksCollection = (tableId: string) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

const saveTrick = async (tableId: string, trick: ITrick) => {
    return getTricksCollection(tableId).add(trick);
};

/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
const getTricksOnTable = async (tableId: string) => {
    const tricks: ITrick[] = [];
    const tricksRef = getTricksCollection(tableId);
    await tricksRef
        .get()
        .then((snapshot: QuerySnapshot) => {
            snapshot.forEach((trick) => {
                tricks.push(trick.data() as ITrick);
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return tricks;
};

const addTrick = async (message: IMessage) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;

    await saveTrick(tableId, eventData);

    const tricks = await getTricksOnTable(tableId);

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
        const nextDealer = await fbTableRef.get()
            .then((snapshot: DocumentSnapshot) => snapshot.data().firstPlayerId);
        const nextPlayer = await nextPlayerPlusPlus(tableId, nextDealer);
        await fbTableRef.update(
            {
                mode: 'announce',
                firstPlayerId: nextPlayer,
                currentPlayerId: nextPlayer
            },
        );
    }
};