import { sortCards, Card, Hand, filterHigherCards, possibleCards, getHighestCard } from './index';

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
        { cardId: 'AH', expected: { color: 'H', height: 'A' } },
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
            cards: ['10H', 'JH', 'AH', '9H', '10S', 'JS', 'AS', '9S', '7D'].map(c => new Card(c)),
            trump: 'H',
            color: 'H',
            expected: new Card('JH'),
        },
        {
            cards: ['10H', 'JH', 'AH', '9H', '10S', 'JS', 'AS', '9S', '7D'].map(c => new Card(c)),
            trump: 'C',
            color: 'S',
            expected: new Card('AS'),
        },
        {
            cards: ['10H', 'JH', 'AH', '9H', '10S', 'JS', 'AS', '9S', '7D'].map(c => new Card(c)),
            trump: 'C',
            color: 'D',
            expected: new Card('7D'),
        },
    ].forEach((data) => {
       test('getHighestCard', () => {
           expect(getHighestCard(data.cards, data.trump, data.color)).toEqual(data.expected);
       });
    });

    [
        {
            isTrump: true, // diamonds
            eligibleCardsInHand: [
                new Card('AD'),
            ],
            lastHighestCard: new Card('10D'),
            expected: [
                new Card('AD'),
            ],
        },
        {
            isTrump: false, // hearts
            eligibleCardsInHand: [
                new Card('8H'),
                new Card('AH'),
                new Card('JH'),
                new Card('KH'),
            ],
            lastHighestCard: new Card('QH'),
            expected: [
                new Card('AH'),
                new Card('KH'),
                // Card order when  `no-trumps`:
                // A > 10 > K > Q > J > 9 > 8 > 7
                // 11 / 10 / 4 / 3 / 2 / 0 / 0 / 0
                //
                // Card order in `trumps`:
                // J > 9 > A > 10 > K > Q > 8 > 7
                // 20 / 14 / 11 / 10 / 4 / 3 / 0 / 0
            ],
        },
    ].forEach((data) => {
        test('filterHigherCards', () => {
            const higherCard = filterHigherCards(data.isTrump, data.lastHighestCard);
            const eligibleCard = data.eligibleCardsInHand.filter(higherCard).map(card => card.id);
            expect(eligibleCard).toEqual(data.expected.map(card => card.id));
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
            firstCardOfTrick: new Card('9H'),
            expected: {
                colorCards: [
                    new Card('8H'),
                ],
                trumpCards: [
                    new Card('8H'),
                ],
                otherCards: [
                    new Card('10S'),
                    new Card('10C'),
                    new Card('QD'),
                    new Card('JC'),
                    new Card('9D'),
                    new Card('9S'),
                    new Card('7D'),
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
            firstCardOfTrick: new Card('9H'),
            expected: {
                colorCards: [
                    new Card('8H'),
                ],
                trumpCards: [
                    new Card('9S'),
                    new Card('10S'),
                ],
                otherCards: [
                    new Card('10C'),
                    new Card('QD'),
                    new Card('JC'),
                    new Card('9D'),
                    new Card('7D'),
                ],
            },
        },
    ].forEach((data) => {
        test('create Hand', () => {
            const hand = new Hand(data.handCards, data.trump, data.firstCardOfTrick);
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
                cardsPlayed: [new Card('AC')],
                currentPlayer: {
                    id: 2,
                    cards: [new Card('7C'), new Card('8C'), new Card('9C')],
                },
            },
            expected: ['7C', '8C', '9C'],
        },
        {
            data: {
                trump: 'H',
                cardsPlayed: [new Card('8S'), new Card('AH'), new Card('AS')],
                currentPlayer: {
                    id: 2,
                    cards: [new Card('7C'), new Card('JH')],
                },
            },
            expected: ['JH'],
        },
        {
            data: {
                trump: 'H',
                cardsPlayed: [new Card('7H'), new Card('AH'), new Card('AS')],
                currentPlayer: {
                    id: 2,
                    cards: [new Card('10H'), new Card('10S')],
                },
            },
            expected: ['10H'],
        },
        {
            data: {
                trump: 'H',
                cardsPlayed: [new Card('7H'), new Card('AH'), new Card('AS')],
                currentPlayer: {
                    id: 2,
                    cards: [new Card('10H'), new Card('10S'), new Card('9H')],
                },
            },
            expected: ['9H'],
        },
        {
            data: {
                trump: 'S',
                cardsPlayed: ['7H'].map(c => new Card(c)),
                currentPlayer: {
                    id: 2,
                    cards: ['9H', 'AS', '7C', '9D'].map(c => new Card(c)),
                },
            },
            expected: ['9H'],
        },
        {
            data: {
                trump: 'S',
                cardsPlayed: ['7S'].map(c => new Card(c)),
                currentPlayer: {
                    id: 2,
                    cards: ['9H', '7C', '9D'].map(c => new Card(c)),
                },
            },
            expected: ['9H', '7C', '9D'],
        },
        {
            data: {
                trump: 'S',
                cardsPlayed: ['7H', '9S'].map(c => new Card(c)),
                currentPlayer: {
                    id: 2,
                    cards: ['9H', '7C', '9D'].map(c => new Card(c)),
                },
            },
            expected: ['9H'],
        },
        {
            data: {
                trump: 'S',
                cardsPlayed: ['7H', '9S'].map(c => new Card(c)),
                currentPlayer: {
                    id: 2,
                    cards: ['8S', '10S', '7C', '9D'].map(c => new Card(c)),
                },
            },
            expected: ['8S', '10S'],
        },
        {
            data: {
                trump: 'H',
                cardsPlayed: ['AD', '7H'].map(c => new Card(c)),
                currentPlayer: {
                    id: 2,
                    cards: ['7D', '8H'].map(c => new Card(c)),
                },
            },
            expected: ['7D'],
        },
        // I'm the first one playing
        {
            data: {
                trump: 'H',
                cardsPlayed: [], // no card played !?
                currentPlayer: {
                    id: 1,
                    cards: ['7D', '8H'].map(c => new Card(c)),
                },
            },
            expected: ['7D', '8H'], // check this
        },
        // I'm the second one playing
        {
            data: {
                trump: 'H',
                cardsPlayed: ['8D'].map(c => new Card(c)),
                currentPlayer: {
                    id: 2,
                    cards: ['7D', '8H'].map(c => new Card(c)),
                },
            },
            expected: ['7D'], // check this
        },
        // My partner played, and he's master
        {
            data: {
                trump: 'H',
                cardsPlayed: ['8D', '9C'].map(c => new Card(c)), // partner played 8D
                currentPlayer: {
                    id: 3,
                    cards: ['7D', '8H'].map(c => new Card(c)),
                },
            },
            expected: ['7D'], // check this
        },
        // My partner played, but opponent have the higherCard
        {
            data: {
                trump: 'H',
                cardsPlayed: ['8D', 'KC'].map(c => new Card(c)), // partner played 8D
                currentPlayer: {
                    id: 3,
                    cards: ['10C', '8H'].map(c => new Card(c)),
                },
            },
            expected: ['10C'], // this should be correct
        },
        // My partner played a trump card, but opponent played > trump.
        {
            data: {
                trump: 'H',
                cardsPlayed: ['AH', '9H'].map(c => new Card(c)), // opponent played 9H
                currentPlayer: {
                    id: 3,
                    cards: ['7D', 'JH'].map(c => new Card(c)),
                },
            },
            expected: ['JH'],
        },
        // My partner played a trump card, but opponent played > trump,  I don't have trump card
        {
            data: {
                trump: 'H',
                cardsPlayed: ['AH', '9H'].map(c => new Card(c)), // opponent played 9H
                currentPlayer: {
                    id: 3,
                    cards: ['7D', '8D'].map(c => new Card(c)),
                },
            },
            expected: ['7D', '8D'],
        },
    ].forEach((data) => {
        test('possibleCards', () => {
            expect(possibleCards(data.data.trump, data.data.currentPlayer, data.data.cardsPlayed)
                .map(card => card.id))
                .toEqual(expect.arrayContaining(data.expected));
        });
    });
});
