import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

/**
 *
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.updateTable = functions.firestore.document('tables/{tableId}').onUpdate(async (event) => {
    const tableId = event.params.tableId;

    const currentPlayerId = event.data.data().general.currentPlayerId;

    const tableRef = admin.firestore().collection('tables').doc(tableId);

    const playersRef = tableRef.collection('players');
    const tricksRef = tableRef.collection('tricks');

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

    const currentPlayer = players.find(player => player.id === currentPlayerId);

    if (currentPlayer.isFakePlayer) {
        tricksRef.add({
            playerId: currentPlayerId,
            cardId: currentPlayer.cards[0],
        });
        playersRef.doc(currentPlayerId).update({ cards: currentPlayer.cards.slice(1) });
    }
});
