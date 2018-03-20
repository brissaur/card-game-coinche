import { filterCardsByColor, getCardColor } from './index';

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

describe.only('test filterCardsByColor function', () => {

    [
        {card: 'AH', expected:'H'},
        {card: '10H', expected:'H'},
        {card: 'AS', expected:'S'},
        {card: 'JD', expected:'D'},
        {card: '7C', expected:'C'},
    ].forEach((data) => {
        test('getCardColor', () => {
            expect(getCardColor(data.card)).toEqual(data.expected);
        });
    });


    [
        {
            color: 'H',
            expected: [
                '7H',
                '8H',
                '9H',
                '10H',
                'AH',
                'JH',
                'QH',
                'KH',
            ],
        }
    ].forEach((data) => {
        test.only('filterCardsByColor', () => {
            expect(cards.filter(filterCardsByColor(data.color))).toEqual(data.expected);
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
// describe.only('test function', () => {
//     [
//         {
//             data: {
//                 trump: 'H',
//                 players: [{ id: 1, pos: 0 }, { id: 2, pos: 1 }, { id: 3, pos: 2 }, { id: 4, pos: 3 }],
//                 cardsPlayed: [{ cardId: 'AC', playerId: 1 }],
//                 currentPlayerId: 2,
//                 hand: ['7C', '8C', '9C']
//             },
//             expected: [],
//         },
//     ].forEach((data) => {
//         test('computeNextPlayerAfterTrick', () => {
//             const players = [
//                 { id: 1, pos: 0 },
//                 { id: 2, pos: 1 },
//                 { id: 3, pos: 2 },
//                 { id: 4, pos: 3 },
//             ];
//
//             const nextPlayer = computeNextPlayerAfterTrick(players, data.currentPlayerId);
//             expect(nextPlayer.id).toEqual(data.expectedNextPlayerId);
//         });
//     });
// });
