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
            });
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents', err);
        });

    const tricks = event.data.data();
    const lastPlayerId = tricks[tricks.length - 1].playerId;
    const currentPlayer = computeNextPlayerAfterRound(players, lastPlayerId);

    tableRef.update({
        general: {
            currentPlayerId: currentPlayer.id,
        },
    });

    return event;

});