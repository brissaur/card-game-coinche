import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { computeNextPlayer } from './business';

admin.initializeApp(functions.config().firebase);

/**
 *
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addTrick = functions.firestore.document('tables/{tableId}/tricks/{trickId}').onCreate(async (event) => {
    const tableId = event.params.tableId;

    const tableRef = admin.firestore().collection('tables').doc(tableId);

    const playersRef = tableRef.collection('players');

    const players = [];

    await playersRef.get()
        .then((snapshot) => {
            snapshot.forEach((player) => {
                players.push(player.data());
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    const previousPlayerId = event.data.data().playerId;
    const currentPlayer = computeNextPlayer(players, previousPlayerId);

    tableRef.update({
        general: {
            currentPlayerId: currentPlayer.id,
        },
    });

    return event;
});
