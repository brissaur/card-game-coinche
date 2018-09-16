const Firestore = require('@google-cloud/firestore');

//import { Firestore } from '@google-cloud/firestore';
//import { FIREBASE_PROJECT_ID, GCLOUD_PRIVATE_KEY_FILE } from '../build.properties';

const FIREBASE_API_KEY = 'AIzaSyCnCrqRf2EUdZKwJ9HVdpfDFgZpFQ4LI2g';
const FIREBASE_AUTH_DOMAIN = 'card-game-coinche-ad92d.firebaseapp.com';
const FIREBASE_DATABASE_URL = 'https://card-game-coinche-ad92d.firebaseio.com';
const FIREBASE_PROJECT_ID = 'card-game-coinche-ad92d';
const FIREBASE_STORAGE_BUCKET = '';
const FIREBASE_MESSAGING_SENDER_ID = '125766558847';
const GCLOUD_PRIVATE_KEY_FILE = './card-game-coinche-f9dad125fcc4.json';
const WEBSOCKET_HOST = 'localhost';
const WEBSOCKET_PORT = 8081;

const firestore = new Firestore({
    projectId: FIREBASE_PROJECT_ID,
    keyFilename: GCLOUD_PRIVATE_KEY_FILE,
});

// prevent warning with Date Objects which will change any soon
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const COLLECTION_NAME = 'tables';

const getTableById = tableId => {
    return firestore
        .collection(COLLECTION_NAME)
        .doc(tableId);
};

console.log(getTableById('BFI4OmZPdM62sjYELRm7'));

//
// export async function nextPlayerPlusPlus(tableId, previousPlayerId) {
//     const players = await getPlayersOnTable(tableId);
//     const nextPlayer = computeNextPlayerForTrick(players, previousPlayerId);
//     const tableRef = getTableById(tableId);
//     tableRef.update(
//         {
//             currentPlayerId: nextPlayer.id,
//         },
//         { merge: true },
//     );
// }

// /**
//  * @dataProvider updateTable({after: {currentPlayerId: 'V32GHS3W8yCxvpepFbgF'}, before: {}})
//  * @type {CloudFunction<DeltaDocumentSnapshot>}
//  */
// exports.updateTable = functions.firestore.document(`${COLLECTION_NAME}/{tableId}`).onUpdate(async (change, context) => {
//     const tableId = context.params.tableId;
//     const eventData = change.after.data();
//     const currentPlayerId = eventData.currentPlayerId;
//
//     const players = await getPlayersOnTable(tableId);
//     const currentPlayer = players.find(player => player.id === currentPlayerId);
//
//     if (currentPlayer.isFakePlayer) {
//         if (eventData.mode === 'play') {
//             const cardsPlayedRef = getCardsPlayedCollection(tableId);
//             const cardsPlayed = await getCardsPlayedOnTable(tableId);
//             const trump = eventData.currentAnnounce.announce.slice(-1);
//             const cards = possibleCards(
//                 trump,
//                 { ...currentPlayer, cards: currentPlayer.cards.map(cardId => new Card(cardId)) },
//                 cardsPlayed.map(({ cardId }) => new Card(cardId)),
//             );
//
//             const nextCardPlayed = cards[0].id;
//
//             await cardsPlayedRef.add({
//                 playerId: currentPlayerId,
//                 cardId: nextCardPlayed,
//             });
//
//             const playersRef = getPlayersCollection(tableId);
//             await playersRef.doc(currentPlayerId).update({ cards: currentPlayer.cards.filter(c => c !== nextCardPlayed) });
//         } else {
//             await performAnnounce(tableId, currentPlayerId);
//         }
//     }
// });

async function createAnnounce(doc, announce){
    return doc.collection('announces').add(announce);
}

async function createCardsPlayed(doc, cardsPlayed){
    return doc.collection('cardsPlayed').add(cardsPlayed);
}

async function createPlayer(firstname, isFakePlayer){
    return firestore.collection('players').add({
        firstname,
        isFakePlayer
    });
}

async function createPlayerInTable(doc, cards, player, pos){
    return doc.collection('player').add({
        cards: cards,
        firstname: player.firstname,
        id: player.id,
        isFakePlayer: player.isFakePlayer,
        pos: pos
    });
}


// create table

(async function start(){

    const player1 = createPlayer('Michelle', false);
    const robot1 = createPlayer('Robot1', true);
    const robot2 = createPlayer('Robot2', true);
    const robot3 = createPlayer('Robot3', true);

    const table = firestore.collection(COLLECTION_NAME).add({
        currentAnnounce : {
            announce: '80H',
            playerId: 'bAiCLTloVajW2XcqpMe9'
        },
        currentPlayerId: 'bAiCLTloVajW2XcqpMe9',
        firstPlayerId: 'bAiCLTloVajW2XcqpMe9',
        mode: 'play'
    });

    await createPlayerInTable(table, [
            'JH'
        ],
        player1,
        1
    );

    await createAnnounce(table, {
        announce: '80H',
        playerId: 'bAiCLTloVajW2XcqpMe9'
    });

    await createAnnounce(table,{
        announce: 'pass',
        playerId: 'bAiCLTloVajW2XcqpMe0'
    });

    await createAnnounce(table,{
        announce: 'pass',
        playerId: 'bAiCLTloVajW2XcqpMe1'
    });

    await createAnnounce(table, {
        announce: 'pass',
        playerId: 'bAiCLTloVajW2XcqpMe2'
    });

    await createCardsPlayed(table, {
        cardId: '8S',
        playerId: 'bAiCLTloVajW2XcqpMe9'
    });

    await createCardsPlayed(table, {
        cardId: '9S',
        playerId: 'bAiCLTloVajW2XcqpMe0'
    });
})();