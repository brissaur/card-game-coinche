import shuffle from 'lodash/shuffle';
const functions = require('firebase-functions');

/**
 * dataProvider { players: [ { id: 'IEOCmi6TkPJ2G0LEUInH' }, { id: 'Qc9YMPbs9qY9a6NbzofK' }, { id: 'XbPRUknEfzeVCpOuTrRA' }, { id: '3MdqHPfrUOlLK38XZKR1' }]}
 * @type {CloudFunction<DeltaDocumentSnapshot>|*}
 */
exports.dealCards = functions.firestore.document('tables/{tableId}').onCreate(event => {
    const players = event.data.data().players;
    const cards = shuffle([
        '7S', '8S', '9S', '10S', 'AS', 'JS', 'QS', 'KS',
        '7H', '8H', '9H', '10H', 'AH', 'JH', 'QH', 'KH',
        '7D', '8D', '9D', '10D', 'AD', 'JD', 'QD', 'KD',
        '7C', '8C', '9C', '10C', 'AC', 'JC', 'QC', 'KC',
    ]);

    for(let playerNumber = 0; playerNumber < 4; playerNumber++){
        players[playerNumber] = assignCardsToPlayer(
            cards.slice(playerNumber * 8, (playerNumber * 8) + 8),
            players[playerNumber]
        );
    }

    return event.data.ref.update({players: players, state: {currentPlayerId : players[0].id}});
});

exports.giveHandNextPlayer = functions.firestore.document('tables/{tableId}').onUpdate(event => {
    let currentData = event.data.data();
    let previousData = event.data.previous.data();
    let currentTrick = currentData.trick;
    let previousTrick = previousData.trick;

    if(currentTrick.length > previousTrick.length){
        currentData.state.currentPlayerId =
    }
});

const assignCardsToPlayer = (cards, player) => {
    return {...player, cards}
};
