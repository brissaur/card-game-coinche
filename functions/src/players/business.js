import { shuffle } from 'lodash';

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
exports.dealCards = function dealCards(players) {
    const playerWithCards = [];
    for (let playerNumber = 0; playerNumber < 4; playerNumber += 1) {
        playerWithCards[playerNumber] = assignCardsToPlayer(
            shuffle(cards).slice(playerNumber * 8, playerNumber * 8 + 8),
            players[playerNumber],
        );
    }

    return playerWithCards;
};
