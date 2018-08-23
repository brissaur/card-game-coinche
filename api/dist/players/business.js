"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const card_1 = require("../entity/card");
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
 * @param player
 * @returns {boolean}
 */
exports.searchStartPlayer = (player) => player.pos === 0;
/**
 *
 * @param players
 * @returns {*}
 */
exports.dealCards = (players) => {
    const shuffleCards = lodash_1.shuffle(cards);
    players.map(function (player, idx) {
        player.setCards(shuffleCards.slice(idx * 8, idx * 8 + 8).map(c => new card_1.Card(c)));
    });
    return players;
};
//# sourceMappingURL=business.js.map