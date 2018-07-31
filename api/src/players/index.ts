import {getTableById, Table} from '../tables/index';
import { dealCards, searchStartPlayer } from './business';
import { CollectionReference, DocumentReference, QuerySnapshot, QueryDocumentSnapshot } from "@google-cloud/firestore";
import {IPlayer} from "../players/types";
import {IMessage} from "../websocket/types";
import {connection} from "../websocket";
import { repository as playerRepository } from '../repository/PlayerRepository';
import { repository as tableRepository } from '../repository/TableRepository';

const COLLECTION_NAME = 'players';

export class Player{
    id: string;
    firstname: string;
    isFakePlayer: boolean;
    pos: number;
    cards: string[];
    constructor(firstname: string, isFakePlayer: boolean){
        this.firstname = firstname;
        this.isFakePlayer = isFakePlayer;
    }
}

/**
 *
 * @param tableId
 */
export const getPlayersCollection = (tableId: string):CollectionReference  => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

const savePlayer = (player: Player): Promise<DocumentReference> => {
    return
};

const createFakePlayer = (pos: number) => {
    let player = new Player('Robot '+pos, true);
};

const createPlayer = (): Player => {
    return new Player('Michelle', false);
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

const onInit = async () => {
    let player = createPlayer();
    let table = new Table();

    player = await playerRepository.savePlayer(player);

    table = await tableRepository.saveTable(new Table());

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
                mode: 'announce'
            }
        );
    }
};


export const actions = {
    "init": onInit
};

// wss.on('', (message: IMessage) => {
//     return onAddPlayer(message);
// });
