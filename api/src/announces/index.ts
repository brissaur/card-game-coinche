import { getTableById, nextPlayerPlusPlus } from '../tables';
import { announceIA, shouldStopAnnounces, getBestAnnounce } from './business';
import { QuerySnapshot } from "@google-cloud/firestore";
import {Announce, IAnnounce} from "./model";
import {IMessage} from "../websocket/types";
import { ANNOUNCE_MAKE_SERVER_WS, connection } from '../websocket';
import {onInit} from "../players";
import { repository as tableRepository } from '../repository/table/tableRepository';
import {ISession} from "../websocket/session";

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

const onAnnounce = async (message: IMessage, session: ISession) => {
    const eventData = message.payload;

    const table = await tableRepository.getTableById(session.getTableDocumentId());

    const announce = new Announce();
    announce.setAnnounce(eventData.announce);
    announce.setPlayerId(session.getPlayerDocumentId());
    table.setAnnounces([announce]);

    await tableRepository.upsertTable(table);

    console.log('table', table);

    // save announce in DB
    // await saveAnnounce(tableId, eventData);
    //
    // // get back announces from DB
    // const announces = await getAnnounces(tableId);
    // if (shouldStopAnnounces(announces)) {
    //     const fbTable = getTableById(tableId);
    //     const firstPlayerId = await fbTable.get().then(doc => doc.data().firstPlayerId);
    //
    //     await emptyCollection(getAnnouncesCollection(tableId));
    //
    //     await fbTable.update(
    //     {
    //             currentPlayerId: firstPlayerId,
    //             currentAnnounce: getBestAnnounce(announces),
    //             mode: 'play',
    //         }
    //     );
    // } else {
    //     await nextPlayerPlusPlus(tableId, playerId);
    // }
};

export const actions: {[key: string]: any} = {
    "make": onAnnounce
};