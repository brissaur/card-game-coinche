import { filterCardsByColor, getCardColor, sortCards, Card, Hand, getHigherCards } from './index';

// remove lodash, it should not be useful

export const cards = [
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

describe('test function', () => {
    [
        { cardId: '7H', expected: { color: 'H', height: '7' } },
        { cardId: '10H', expected: { color: 'H', height: '10' } },
        { cardId: 'AH', expected: { color: 'H', height: 'AH' } },
    ].forEach((data) => {
        test('create Card', () => {
            const card = new Card(data.cardId);
            expect(card.color).toBe(data.expected.color);
            expect(card.height).toBe(data.expected.height);
        });
    });

    [
        {
            trump: null,
            cards: [
                new Card('7H'),
                new Card('KH'),
                new Card('JH'),
                new Card('AH'),
                new Card('9H'),
                new Card('8H'),
                new Card('10H'),
                new Card('QH'),
            ],
            expected: ['AH', '10H', 'KH', 'QH', 'JH', '9H', '8H', '7H'],
        },
        {
            trump: 'H',
            cards: [
                new Card('7H'),
                new Card('KH'),
                new Card('JH'),
                new Card('AH'),
                new Card('9H'),
                new Card('8H'),
                new Card('10H'),
                new Card('QH'),
            ],
            expected: ['JH', '9H', 'AH', '10H', 'KH', 'QH', '8H', '7H'],
        },
    ].forEach((data) => {
        test('sortCard', () => {
            expect(data.cards.sort(sortCards(data.trump)).map(card => card.id)).toEqual(data.expected);
        });
    });


    [
        {
            isTrump: true, // diamonds
            eligibleCardsInHand: [
                new Card('AD'),
            ],
            playedCardsInTrick: [
                new Card('8D'),
                new Card('10D'),
            ],
            expected: [
                new Card('AD'),
                // Card order when  `no-trumps`:
                // A > 10 > K > Q > J > 9 > 8 > 7
                // 11 / 10 / 4 / 3 / 2 / 0 / 0 / 0
                //
                // Card order in `trumps`:
                // J > 9 > A > 10 > K > Q > 8 > 7
                // 20 / 14 / 11 / 10 / 4 / 3 / 0 / 0
            ],
        },
        // {
        //     hand: [
        //         new Card('KC'),
        //         new Card('9S'),
        //         new Card('8C'),
        //         new Card('KH'),
        //         new Card('AD'),
        //         new Card('QC'),
        //         new Card('QH'),
        //         new Card('KS'),
        //     ],
        // }
    ].forEach((data) => {
        test.only('getHigherCard', () => {
            expect(data.eligibleCardsInHand.filter(getHigherCards(data.isTrump, data.playedCardsInTrick)).map(card => card.id)).toEqual(data.expected.map(card => card.id));
            // en entrée j'ai un tableau de Card a comparé
            // je passe en paramètre la main du joueur

            // en fonction de si je suis en mode "trump" ou non
            // je dois trouver quel sont les cartes du joueurs qui sont supérieures aux cartes à comparer

            // si je tri les cartes du joueur, et que je tri les cartes à comparer, ca doit être possible

        });
    });
});

describe('test Hand', () => {
    [
        {
            handCards: [
                new Card('9D'),
                new Card('7D'),
                new Card('10S'),
                new Card('QD'),
                new Card('10C'),
                new Card('8H'),
                new Card('9S'),
                new Card('JC'),
            ],
            trump: 'H',
            firstCardColor: 'H',
            expected: {
                colorCards: [
                    new Card('8H'),
                ],
                trumpCards: [
                    new Card('8H'),
                ],
                otherCards: [
                    new Card('9D'),
                    new Card('7D'),
                    new Card('10S'),
                    new Card('QD'),
                    new Card('10C'),
                    new Card('9S'),
                    new Card('JC'),
                ],
            },
        },
        {
            handCards: [
                new Card('9D'),
                new Card('7D'),
                new Card('10S'),
                new Card('QD'),
                new Card('10C'),
                new Card('8H'),
                new Card('9S'),
                new Card('JC'),
            ],
            trump: 'S',
            firstCardColor: 'H',
            expected: {
                colorCards: [
                    new Card('8H'),
                ],
                trumpCards: [
                    new Card('10S'),
                    new Card('9S'),
                ],
                otherCards: [
                    new Card('9D'),
                    new Card('7D'),
                    new Card('QD'),
                    new Card('10C'),
                    new Card('JC'),
                ],
            },
        },
    ].forEach((data) => {
        test('create Hand', () => {
            const hand = new Hand(data.handCards, data.trump, data.firstCardColor);
            expect(hand.getColorCards().map(card => card.id)).toEqual(data.expected.colorCards.map(card => card.id));
            expect(hand.getTrumpCards().map(card => card.id)).toEqual(data.expected.trumpCards.map(card => card.id));
            expect(hand.getOtherCards().map(card => card.id)).toEqual(data.expected.otherCards.map(card => card.id));
        });
    });
});

/**
 **
 * 1st case :
 *  - trump : Heart
 *  - tricks has started with Clubs color
 *  - player position: 2
 *  - player has clubs color => clubs cards list
 * 2nd case:
 * - trump: Heart
 * - tricks has started with Clubs color
 * - player position: 2
 * - player has no clubs color, but has trump => trump cards list
 * 3rd case:
 *  - trump: Heart
 *  - tricks has started with Clubs color
 *  - player position : 2
 *  - player has no club color, either no heart => others card list (spades and diamonds)
 * 4th case:
 *  - trump: Heart
 *  - trick has started with Heart color
 *  - player position: 2
 *  - higher card: Heart J
 *  - player has trumps cards, and has higher card (A and K) => list higher card
 *  5th case:
 *  - trump: Heart
 *  - trick has started with Heart color (so trump is called)
 *  - player position: 2
 *  - higher card: Heart J
 *  - player has trumps cards, but none higher, but he has other card => list others card
 *
 *
 * Atout: Couleur choisie au début du round
 * Color: Couleur définie par la carte désigné au début du trick
 * Obligé de couper (joué de l'atout - ou à défaut une autre carte) quand le joueur n'a pas la couleur ou que le partenaire n'est pas en train de gagner
 */
describe('test function', () => {
    [
        {
            data: {
                trump: 'H',
                players: [{ id: 1, pos: 0 }, { id: 2, pos: 1 }, { id: 3, pos: 2 }, { id: 4, pos: 3 }],
                cardsPlayed: [{ cardId: 'AC', playerId: 1 }],
                currentPlayerId: 2,
                hand: ['7C', '8C', '9C'],
            },
            expected: ['7C', '8C', '9C'],
        },
    ].forEach((data) => {
        test('computeNextPlayerAfterTrick', () => {
            const players = [
                { id: 1, pos: 0 },
                { id: 2, pos: 1 },
                { id: 3, pos: 2 },
                { id: 4, pos: 3 },
            ];

            const nextPlayer = computeNextPlayerAfterTrick(players, data.currentPlayerId);
            expect(nextPlayer.id).toEqual(data.expectedNextPlayerId);
        });
    });
});
