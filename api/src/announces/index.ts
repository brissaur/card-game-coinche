import { emptyCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus } from '../tables';
import { announceIA, shouldStopAnnounces, getBestAnnounce } from './business';
import { QuerySnapshot } from "@google-cloud/firestore";
import {IAnnounce} from "./types";
import {IMessage} from "../websocket/types";

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

const onAnnounce = async (message: IMessage) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;
    const playerId = eventData.playerId;

    // save announce in DB
    await saveAnnounce(tableId, eventData);

    // get back announces from DB
    const announces = await getAnnounces(tableId);
    if (shouldStopAnnounces(announces)) {
        const fbTable = getTableById(tableId);
        const firstPlayerId = await fbTable.get().then(doc => doc.data().firstPlayerId);

        await emptyCollection(getAnnouncesCollection(tableId));

        await fbTable.update(
        {
                currentPlayerId: firstPlayerId,
                currentAnnounce: getBestAnnounce(announces),
                mode: 'play',
            }
        );
    } else {
        await nextPlayerPlusPlus(tableId, playerId);
    }
};