import { shuffle } from 'lodash';
import {IPlayer, Player} from "./model";
import {Card} from "../cardsPlayed/model";

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
export const searchStartPlayer = (player: Player) => player.pos === 0;

/**
 *
 * @param players IPlayer[]
 * @returns ICardId[]
 */
export const dealCards = (players: IPlayer[]) => {
    const shuffleCards = shuffle(cards);
    players.map(function(player, idx: number){
        player.setCards(shuffleCards.slice(idx * 8, idx * 8 + 8).map(c => new Card(c)))
    });

    return players;
};
