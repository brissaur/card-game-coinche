import {getTableById} from '../tables';
import { dealCards, searchStartPlayer } from './business';
import { CollectionReference, QuerySnapshot, QueryDocumentSnapshot } from "@google-cloud/firestore";
import {formatMsgForWs} from "../websocket/helper";
import { repository as playerRepository } from '../repository/player/playerRepository';
import { repository as tableRepository } from '../repository/table/tableRepository';
import { Player, createPlayer, createFakePlayer } from './model';
import { createTable } from '../tables/model';
import {
    PLAYER_JOIN_SERVER_WS,
    GAME_START_SERVER_WS,
    PLAYER_INIT_SERVER_WS,
    CARDS_DEAL_SERVER_WS,
    PLAYER_ACTIVE_SERVER_WS
} from '../websocket';
import {ISession} from "../websocket/session";
import {modes} from "../announces/business";
import WebSocket = require("ws");

const COLLECTION_NAME = 'players';

/**
 *
 * @param tableId
 */
export const getPlayersCollection = (tableId: string):CollectionReference  => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
export const getPlayersOnTable = async (tableId: string): Promise<Player[]> => {
    const players: Player[] = [];
    const playersRef = getPlayersCollection(tableId);
    await playersRef
        .get()
        .then((snapshot: QuerySnapshot) => {
            snapshot.forEach((player: QueryDocumentSnapshot) => {
                players.push(player.data() as Player);
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    return players;
};

export const onInit = async (ws: WebSocket, session: ISession) => {
    const player = await playerRepository.savePlayer(createPlayer());

    const table = createTable();

    await tableRepository.upsertTable(table);

    session.setPlayerDocumentId(player.getDocumentId());
    session.setTableDocumentId(table.getDocumentId());

    ws.send(formatMsgForWs(PLAYER_INIT_SERVER_WS, {
        playerId: player.getDocumentId(),
        playerName: player.getFirstname(),
        tableId: table.getDocumentId()
    }, {}));
    ws.send(formatMsgForWs(PLAYER_JOIN_SERVER_WS, {
        player: {
            id: player.getDocumentId(),
            pos: player.getPos()
        },
    }, {}));

    const robot1Pr = playerRepository.savePlayer(createFakePlayer(1));
    const robot2Pr = playerRepository.savePlayer(createFakePlayer(2));
    const robot3Pr = playerRepository.savePlayer(createFakePlayer(3));
    const [robot1, robot2, robot3] = await Promise.all([robot1Pr, robot2Pr, robot3Pr]);

    const players = [player, robot1, robot2, robot3];
    table.setPlayers(players);

    [robot1, robot2, robot3].forEach((robot) => {
        ws.send(formatMsgForWs(PLAYER_JOIN_SERVER_WS, {
            player: {
                id: robot.getDocumentId(),
                pos: robot.getPos()
            },
        }, {}));
    });

    if (table.getPlayers().length === 4) {
        table.setPlayers(dealCards(players));

        const firstPlayerId = players.find(searchStartPlayer).getDocumentId();
        table.setFirstPlayerId(firstPlayerId);
        table.setCurrentPlayerId(firstPlayerId);
        table.setMode(modes.ANNOUNCE);

        await tableRepository.upsertTable(table);

        ws.send(formatMsgForWs(GAME_START_SERVER_WS, {
            dealerId: table.getCurrentPlayerId(),
            mode: table.getMode(),
            firstPlayerId: table.getFirstPlayerId(),
            currentPlayerId: table.getCurrentPlayerId(),
        }, {}));

        ws.send(formatMsgForWs(CARDS_DEAL_SERVER_WS, {
            cards: player.getCards().map(c => c.getCardId())
        }, {}));

        ws.send(formatMsgForWs(PLAYER_ACTIVE_SERVER_WS, {
            playerId: player.getDocumentId()
        }, {}));

    }
};

export const actions: {[key: string]: any} = {
    "init": onInit
};