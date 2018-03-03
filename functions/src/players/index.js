import * as functions from 'firebase-functions/lib/index';
import * as admin from 'firebase-admin/lib/index';
import { dealCards } from './business';

admin.initializeApp(functions.config().firebase);

/**
 *
 * @param event
 * @returns {Promise<*>}
 */
async function onAddPlayer(event) {
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

    if (players.length === 4) {
        const playersWithCards = dealCards(players);

        playersWithCards.forEach((player) => {
            playersRef.doc(player.id).update({ cards: player.cards });
        });

        // for (const player of playersWithCards) {
        //     playersRef.doc(player.id).update({ cards: player.cards });
        // }

        tableRef.update({
            general: {
                currentPlayerId: playersWithCards[0].id,
            },
        });
    }

    return event;
}

/**
 *
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addPlayer = functions.firestore.document('tables/{tableId}/players/{playerId}').onCreate(onAddPlayer);
