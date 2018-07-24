import { emptyCollection } from '../common/collection';
import { getTableById, nextPlayerPlusPlus } from '../tables';
import { announceIA, shouldStopAnnounces, getBestAnnounce } from './business';

const COLLECTION_NAME = 'announces';

export const getAnnouncesCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

function createAnnouncesFromSnapshot(snapshot) {
    const announces = [];

    snapshot.forEach(doc => announces.push(doc.data()));

    return announces;
}

const saveAnnounce = (tableId, announce) => {
    return getAnnouncesCollection(tableId).add(announce);
};

export async function getAnnounces(tableId) {
    const announces = await getAnnouncesCollection(tableId)
        .get()
        .then(createAnnouncesFromSnapshot);

    return announces;
}

export async function performAnnounce(tableId, playerId) {
    await getAnnouncesCollection(tableId).add({
        playerId,
        announce: announceIA(),
    });
}

const onAnnounce = async (message) => {
    const tableId = message.meta.tableId;
    const eventData = message.payload;
    const playerId = eventData.playerId;

    // save announce in DB
    await saveAnnounce(eventData);

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
            },
            { merge: true },
        );
    } else {
        await nextPlayerPlusPlus(tableId, playerId);
    }
};