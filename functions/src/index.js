import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { shuffle } from 'lodash';

admin.initializeApp(functions.config().firebase);

/**
 *
 * @param cards
 * @param player
 * @returns {{cards: *}}
 */
const assignCardsToPlayer = (cards, player) => ({ ...player, cards });

/**
 *
 * @type {any | Array}
 */
const cards = [
    '7S',
    '8S',
    '9S',
    '10S',
    'AS',
    'JS',
    'QS',
    'KS',
    '7H',
    '8H',
    '9H',
    '10H',
    'AH',
    'JH',
    'QH',
    'KH',
    '7D',
    '8D',
    '9D',
    '10D',
    'AD',
    'JD',
    'QD',
    'KD',
    '7C',
    '8C',
    '9C',
    '10C',
    'AC',
    'JC',
    'QC',
    'KC',
];

/**
 *
 * @param players
 * @returns {*}
 */
function dealCards(players) {
    const playerWithCards = [];
    for (let playerNumber = 0; playerNumber < 4; playerNumber += 1) {
        playerWithCards[playerNumber] = assignCardsToPlayer(
            shuffle(cards).slice(playerNumber * 8, playerNumber * 8 + 8),
            players[playerNumber],
        );
    }

    return playerWithCards;
}

function searchStartPlayer(player) {
    return player.pos === 0;
}

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

        tableRef.update({
            general: {
                currentPlayerId: players.filter(searchStartPlayer).id,
            },
        });
    }

    return event;
}

/**
 *
 * @param players
 * @param previousPlayerId
 */
function computeNextPlayer(players, previousPlayerId) {
    const previousPlayer = players.find(player => previousPlayerId === player.id);

    // if previousPlayer was the last one, take the first one
    return players.find(player => player.pos === (previousPlayer.pos + 1) % 4);
}

/**
 *
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.addPlayer = functions.firestore.document('tables/{tableId}/players/{playerId}').onCreate(onAddPlayer);

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
