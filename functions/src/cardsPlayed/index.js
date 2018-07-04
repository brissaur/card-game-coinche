import * as functions from 'firebase-functions';
import { emptyCollection } from '../common/collection';
import { getTableById, COLLECTION_NAME as tableCollectionName, nextPlayerPlusPlus } from '../tables/index';
import { getTricksCollection } from '../tricks/index';

const COLLECTION_NAME = 'cardsPlayed';

export const getCardsPlayedCollection = (tableId) => {
    const table = getTableById(tableId);

    return table.collection(COLLECTION_NAME);
};

/**
 *
 * @param tableId
 */
export const getCardsPlayedOnTable = async (tableId) => {
    const cardsPlayed = [];
    const cardsPlayedRef = getCardsPlayedCollection(tableId);
    await cardsPlayedRef
        .get()
        .then((snapshot) => {
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

/**
 * @dataProvider addCardPlayed({playerId: '2GQLBAuwQiPlDAlAMmVT', card: 'AH'})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addCardPlayed = functions.firestore.document(`${tableCollectionName}/{tableId}/${COLLECTION_NAME}/{cardPlayedId}`)
    .onCreate(async (snap, context) => {
        const tableId = context.params.tableId;
        const cardsPlayed = await getCardsPlayedOnTable(tableId);

        if (cardsPlayed.length >= 4) {
            // add a trick with cardsPlayed
            const tricksCollection = getTricksCollection(tableId);
            tricksCollection.add({ ...cardsPlayed });
            // empty cardsPlayed
            await emptyCollection(getCardsPlayedCollection(tableId));
        }

        await nextPlayerPlusPlus(tableId, snap.data().playerId);
    });
