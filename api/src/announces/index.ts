import { getTableById } from '../tables';
import {announceIA, shouldStopAnnounces, getBestAnnounce, modes} from './business';
import { QuerySnapshot } from "@google-cloud/firestore";
import {Announce, IAnnounce} from "./model";
import {IMessage} from "../websocket/types";
import {ANNOUNCE_MADE_SERVER_WS, PLAYER_ACTIVE_SERVER_WS, ROUND_MODE} from '../websocket';
import { repository as tableRepository } from '../repository/table/tableRepository';
import {ISession} from "../websocket/session";
import {computeNextPlayerForTrick} from "../tables/business";
import {formatMsgForWs} from "../websocket/helper";
import WebSocket from 'ws';
import {extractAnnounce} from "../repository/table/tableHydrator";

const COLLECTION_NAME = 'announces';

export const getAnnouncesCollection = (tableId: string) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

function createAnnouncesFromSnapshot(snapshot: QuerySnapshot) {
    const announces: IAnnounce[] = [];

    snapshot.forEach(doc => announces.push(doc.data() as IAnnounce));

    return announces;
}

const saveAnnounce = (tableId: string, announce: IAnnounce) => {
    return getAnnouncesCollection(tableId).add(announce);
};

export async function getAnnounces(tableId: string) {
    const announces = await getAnnouncesCollection(tableId)
        .get()
        .then(createAnnouncesFromSnapshot);

    return announces;
}

export async function performAnnounce(tableId: string, playerId: string) {
    await getAnnouncesCollection(tableId).add({
        playerId,
        announce: announceIA(),
    });
}

const onAnnounce = async (ws: WebSocket, session: ISession, message: IMessage) => {
    const eventData = message.payload;

    //console.log('eventData', eventData);

    let table = await tableRepository.getTableById(session.getTableDocumentId());
    //console.log('session', session);
    const playerId = eventData.playerId ? eventData.playerId : session.getPlayerDocumentId();
    let player = table.getPlayers()
        .filter(p => p.getDocumentId() === playerId)[0];

    // console.log('player found', player);

    const announce = new Announce();
    announce.setAnnounce(eventData.announce);
    // in case of robot, we get its playerId, otherwise get it from session
    announce.setPlayerId(player.getIsFakePlayer() ? eventData.playerId : session.getPlayerDocumentId());

    table.setAnnounces([...table.getAnnounces(), announce]);
    table.setCurrentAnnounce(announce);
    await tableRepository.upsertTable(table);

    ws.send(formatMsgForWs(ANNOUNCE_MADE_SERVER_WS, {
        announce: extractAnnounce(table.getCurrentAnnounce()),
    }, {}));

    ws.send(formatMsgForWs(PLAYER_ACTIVE_SERVER_WS, {
        playerId: player.getDocumentId()
    }, {}));

    if (shouldStopAnnounces(table.getAnnounces())) {
        console.log('stop announce');
        const firstPlayerId = table.getFirstPlayerId();
        await tableRepository.emptyCollection(tableRepository.getAnnouncesSubCollection(table));

        table.setCurrentPlayerId(firstPlayerId);
        table.setCurrentAnnounce(getBestAnnounce(table.getAnnounces()));
        table.setMode(modes.PLAY);
        await tableRepository.upsertTable(table);

        // should start game !
        ws.send(formatMsgForWs(ROUND_MODE, {
            mode: modes.PLAY,
        }, {}));

        ws.send(formatMsgForWs(PLAYER_ACTIVE_SERVER_WS, {
            playerId: table.getCurrentPlayerId()
        }, {}));
    } else {
        console.log('next player announce');
        const currentPlayer = table.getPlayers().filter(p => p.getDocumentId() === announce.getPlayerId())[0];
        const nextPlayer = computeNextPlayerForTrick(table.getPlayers(), currentPlayer);

        const message = {
            payload: {
                announce: 'pass',
                playerId: nextPlayer.getDocumentId()
            },
            meta: {},
            type: {}
        };
        // call onAnnounce again to fake robot's played
        onAnnounce(ws, session, message);
    }
};

export const actions: {[key: string]: any} = {
    "make": onAnnounce
};