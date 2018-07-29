import { getTableById } from '../tables/index';
import { dealCards, searchStartPlayer } from './business';
import { CollectionReference, DocumentReference, QuerySnapshot, QueryDocumentSnapshot } from "@google-cloud/firestore";
import {IPlayer} from "../common/types";
import {IMessage} from "../websocket/types";

const COLLECTION_NAME = 'players';

/**
 *
 * @param tableId
 */
export const getPlayersCollection = (tableId: string):CollectionReference  => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

const savePlayer = (tableId: string, player: IPlayer): Promise<DocumentReference> => {
    return getPlayersCollection(tableId).add(player);
};

/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
export const getPlayersOnTable = async (tableId: string): Promise<IPlayer[]> => {
    const players: IPlayer[] = [];
    const playersRef = getPlayersCollection(tableId);
    await playersRef
        .get()
        .then((snapshot: QuerySnapshot) => {
            snapshot.forEach((player: QueryDocumentSnapshot) => {
                players.push(player.data() as IPlayer);
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return players;
};

const addPlayer = async (message: IMessage) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;

    await savePlayer(tableId, eventData);

    const players = await getPlayersOnTable(tableId);

    if (players.length === 4) {
        const playersRef = getPlayersCollection(tableId);
        const playersWithCards = dealCards(players);

        playersWithCards.forEach(async (player) => {
            playersRef.doc(player.id).update({ cards: player.cards });
        });
        const tableRef = getTableById(tableId);
        const firstPlayerId = players.find(searchStartPlayer).id;
        await tableRef.update(
            {
                firstPlayerId,
                currentPlayerId: firstPlayerId,
                mode: 'announce',
            },
            { merge: true },
        );
    }
};
