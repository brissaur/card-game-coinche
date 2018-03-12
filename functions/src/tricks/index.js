<<<<<<< HEAD
import * as functions from 'firebase-functions';
import { getPlayersOnTable} from '../players/index';
import { getTableById, COLLECTION_NAME as tableCollectionName } from '../tables/index';
import { computeNextPlayerAfterTrick } from './business';
import { getRoundsCollection } from "../rounds";

const COLLECTION_NAME = 'tricks';

/**
 *
 * @param tableId
 */
export const getTricksCollection = (tableId) => {
    const table = getTableById(tableId);
    return table.collection(COLLECTION_NAME);
};

/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
const getTricksOnTable = async (tableId) => {
    const tricks = [];
    const tricksRef = getTricksCollection(tableId);
    await tricksRef.get()
        .then((snapshot) => {
            snapshot.forEach((trick) => {
                tricks.push(trick.data());
=======
import * as functions from "firebase-functions/lib/index";
import * as admin from "firebase-admin/lib/index";

exports.addTrick = functions.firestore.document('tables/{tableId}/tricks/{trickId}').onCreate(async (event) => {
    const tableId = event.params.tableId;
    const tableRef = admin.firestore().collection('tables').doc(tableId);
    const playersRef = tableRef.collection('players');

    const players = [];

    await playersRef.get()
        .then((snapshot) => {
            snapshot.forEach((player) => {
                players.push(player.data());
>>>>>>> 16977a009a549c45c282ecf03e1df17bfa10ef64
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });
<<<<<<< HEAD
    return tricks;
};

/**
 * @dataProvider addCardPlayed({playerId: 'XXXXXX', cardId: 'AH'})
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addTrick = functions.firestore.document(tableCollectionName+'/{tableId}/'+COLLECTION_NAME+'/{trickId}').onCreate(async (event) => {
    const tableId = event.params.tableId;

    const players = await getPlayersOnTable(tableId);
    const tricks = await getTricksOnTable(tableId);

    if (tricks.length === 8) {
        // add new round
        const roundsRef = getRoundsCollection(tableId);
        roundsRef.add({ ...tricks });
    } else {
        const cardsPlayed = event.data.data();
        const lastPlayerId = cardsPlayed[3].playerId;
        const currentPlayer = computeNextPlayerAfterTrick(players, lastPlayerId);
        const tableRef = getTableById(tableId);
        tableRef.update({
            general: {
                currentPlayerId: currentPlayer.id,
            },
        });
    }

    return event;
=======

    const tricks = event.data.data();
    const lastPlayerId = tricks[tricks.length - 1].playerId;
    const currentPlayer = computeNextPlayerAfterRound(players, lastPlayerId);

    tableRef.update({
        general: {
            currentPlayerId: currentPlayer.id,
        },
    });

    return event;

>>>>>>> 16977a009a549c45c282ecf03e1df17bfa10ef64
});