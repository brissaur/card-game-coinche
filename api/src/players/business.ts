import { shuffle } from 'lodash';
import {ICard} from "../common/types";
import {IPlayer} from "./types";
import {Card} from "../common";

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
 * @param cardsToAssign
 * @param player
 * @returns {{cards: *}}
 */
const assignCardsToPlayer = (cardsToAssign: ICard[], player: IPlayer) => ({ ...player, cards: cardsToAssign });

/**
 *
 * @param player
 * @returns {boolean}
 */
export const searchStartPlayer = (player: IPlayer) => player.pos === 0;

/**
 *
 * @param players
 * @returns {*}
 */
export const dealCards = (players: IPlayer[]) => {
    const playerWithCards = [];
    const shuffleCards = shuffle(cards);
    for (let playerNumber = 0; playerNumber < 4; playerNumber += 1) {
        playerWithCards[playerNumber] = assignCardsToPlayer(
            shuffleCards.slice(playerNumber * 8, playerNumber * 8 + 8).map( c => new Card(c)),
            players[playerNumber],
        );
    }

    return playerWithCards;
};
