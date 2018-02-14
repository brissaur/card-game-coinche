import shuffle from 'lodash/shuffle';
import sortBy from 'lodash/sortBy';
import { firestore } from 'firebase-functions';

const assignCardsToPlayer = (cards, player) => ({ ...player, cards });

function onDealCards(event) {
    const { players } = event.data.data();
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

    for (let playerNumber = 0; playerNumber < 4; playerNumber += 1) {
        players[playerNumber] = assignCardsToPlayer(cards.slice(playerNumber * 8, playerNumber * 8 + 8), players[playerNumber]);
    }

    return event.data.ref.update({
        players,
        general: {
            currentPlayerId: players[0].id,
        },
    });
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

function onCardPlayed(eventData) {
    const currentData = eventData.data();
    const previousData = eventData.previous.data();
    const currentTrick = currentData.trick;
    const previousTrick = previousData.trick;
    const previousPlayers = sortBy(previousData.players, ['pos']);

    // Trick has changed, we need to select the next player
    if (currentTrick.length > previousTrick.length) {
        const previousPlayerId = previousData.general.currentPlayerId;
        const previousPlayerIdx = previousPlayers.findIndex(player => previousPlayerId === player.id);
        // if previousPlayer was the last one, take the first one
        const currentPlayerId = previousPlayers[(previousPlayerIdx + 1) % 4].id;

        return {
            general: {
                ...currentData.general,
                currentPlayerId,
            },
        };
    }

    return null;
}

/**
 * dataProvider { players: [ { id: 'IEOCmi6TkPJ2G0LEUInH' }, { id: 'Qc9YMPbs9qY9a6NbzofK' }, { id: 'XbPRUknEfzeVCpOuTrRA' }, { id: '3MdqHPfrUOlLK38XZKR1' }]}
 * @type {CloudFunction<DeltaDocumentSnapshot>|*}
 */
exports.dealCards = firestore.document('tables/{tableId}').onCreate(onDealCards);

/**
 * onUpdate({before: { trick: [], general: { currentPlayerId: 1 }, players: [{ id: 1}, { id: 2, isFakePlayer: true, cards: [{ id: 'AH' }, { id: '7H' }]}]},after: { trick: [{}], general: { currentPlayerId: 2 }, players: [{ id: 1}, { id: 2, isFakePlayer: true, cards: [{ id: 'AH' }, { id: '7H' }]}]}})
 *
 */
exports.onUpdate = firestore.document('tables/{tableId}').onUpdate((event) => {
    const mutations = [onFakePlayerTurn, onCardPlayed].map(f => f(event.data)).reduce((mutation, res) => ({
        ...res,
        ...mutation,
    }));

    return event.data.ref.set(mutations, { merge: true });
});
