const shuffle = require('lodash/shuffle');
const functions = require('firebase-functions');

/**
 * dataProvider { players: [ { id: 'IEOCmi6TkPJ2G0LEUInH' }, { id: 'Qc9YMPbs9qY9a6NbzofK' }, { id: 'XbPRUknEfzeVCpOuTrRA' }, { id: 'totateiu' }]}
 * @type {CloudFunction<DeltaDocumentSnapshot>|*}
 */
exports.dealCards = functions.firestore.document('tables/{tableId}').onWrite(event => {
    const original = event.data.data();
    console.log('original', original);
    if(original.players){
        const players = original.players;
        console.log('players', players);
        const cards = shuffle([
            '7S', '8S', '9S', '10S', 'AS', 'JS', 'QS', 'KS',
            '7H', '8H', '9H', '10H', 'AH', 'JH', 'QH', 'KH',
            '7D', '8D', '9D', '10D', 'AD', 'JD', 'QD', 'KD',
            '7C', '8C', '9C', '10C', 'AC', 'JC', 'QC', 'KC',
        ]);

        for(let playerNumber = 0; playerNumber < 4; playerNumber++){
            players[playerNumber] = assignCardsToPlayer(cards.slice(playerNumber * 8, (playerNumber * 8) + 8), players[playerNumber]);
        }

        return event.data.ref.set({players: players});
    }
    return original;
})

const assignCardsToPlayer = (cards, player) => {
    return {
        player: player.player,
        cards : cards
    }
}
