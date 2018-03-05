import shuffle from 'lodash/shuffle';
import sortBy from 'lodash/sortBy';
import * as functions  from 'firebase-functions';
import * as admin from 'firebase-admin';
//import firebase from "firebase";

admin.initializeApp(functions.config().firebase);

//console.log(admin.database());

const assignCardsToPlayer = (cards, player) => ({ ...player, cards });

const cards = shuffle([
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
]);

async function onAddPlayer(event) {

    const tableId = event.params.tableId;

    const playersRef = admin.firestore().collection('tables').doc(tableId).collection('players');

    let players = [];
    await playersRef.get()
    .then(snapshot => {
        snapshot.forEach(player => {
            players.push(player.data());
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

    if(players.length === 4){
        dealCards(tableId, players);
    }

    return event;
}

function dealCards(tableId, players){
    for (let playerNumber = 0; playerNumber < 4; playerNumber += 1) {
        players[playerNumber] = assignCardsToPlayer(cards.slice(playerNumber * 8, playerNumber * 8 + 8), players[playerNumber]);
    }

    const tableRef = admin.firestore().collection('tables').doc(tableId);

    const playersRef = tableRef.collection('players');

    for(const player of players){
        playersRef.doc(player.id).update({cards: player.cards});
    }

    tableRef.update({
        general: {
            currentPlayerId: players[0].id
        }
    });

    return players;
}

function onFakePlayerTurn(eventData) {
    const data = eventData.data();
    const previousData = eventData.previous.data();
    const targetPlayerId = data.general.currentPlayerId;

    const hasCurrentPlayerIdChanged = targetPlayerId !== previousData.general.currentPlayerId;
    const targetPlayer = data.players.find(player => player.id === targetPlayerId);

    const isFakePlayer = targetPlayer.isFakePlayer;

    if (hasCurrentPlayerIdChanged && isFakePlayer) {
        const card = targetPlayer.cards[0];
        const newHand = targetPlayer.cards.slice(1);

        return {
            trick: [
                ...data.trick,
                {
                    playerId: targetPlayerId,
                    cardId: card.id,
                },
            ],
            players: [
                ...data.players.filter(({ id }) => id !== targetPlayerId),
                {
                    id: targetPlayerId,
                    cards: newHand,
                },
            ],
        };
    }

    return null;
}

/**
 * dataprovider addPlayer({ id: 'IEOCmi6TkPJ2G0LEUInH' })
 * @type {CloudFunction<DeltaDocumentSnapshot>|*}
 */
exports.addPlayer = functions.firestore.document('tables/{tableId}/players/{playerId}').onCreate(onAddPlayer);

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
    .catch(err => {
        console.log('Error getting documents', err);
    });

    const currentPlayer = players.find((player) => player.id === currentPlayerId);

    if(currentPlayer.isFakePlayer){
        tricksRef.add({
            playerId: currentPlayerId,
            cardId: currentPlayer.cards[0],
        });
        playersRef.doc(currentPlayerId).update({ cards: currentPlayer.cards.slice(1) });
    }
});

/**
 * onUpdate({before: { trick: [], general: { currentPlayerId: 1 }, players: [{ id: 1}, { id: 2, isFakePlayer: true, cards: [{ id: 'AH' }, { id: '7H' }]}]},after: { trick: [{}], general: { currentPlayerId: 2 }, players: [{ id: 1}, { id: 2, isFakePlayer: true, cards: [{ id: 'AH' }, { id: '7H' }]}]}})
 *
 */
exports.addTrick = functions.firestore.document('tables/{tableId}/tricks/{trickId}').onCreate(async (event) => {

    const tableId = event.params.tableId;

    const tableRef = admin.firestore().collection('tables').doc(tableId);

    const playersRef = tableRef.collection('players');

    const players = [];

    await playersRef.get()
    .then((snapshot) => {
        snapshot.forEach(player => {
            players.push(player.data());
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });

    const previousPlayerId = event.data.data().playerId;
    const previousPlayer = players.find(player => previousPlayerId === player.id);
    const previousPlayerPos = previousPlayer.pos;
    // if previousPlayer was the last one, take the first one
    const currentPlayer = players.find((player) => player.pos === (previousPlayerPos + 1) % 4);

    tableRef.update({
        general: {
            currentPlayerId: currentPlayer.id
        }
    });

    return event;
    //
    // const mutations = [onFakePlayerTurn, onCardPlayed].map(f => f(event.data)).reduce((mutation, res) => ({
    //     ...res,
    //     ...mutation,
    // }));
    //
    // return event.data.ref.set(mutations, { merge: true });
});
