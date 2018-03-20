import { dealCards, searchStartPlayer } from './business';

/** http://luetkemj.github.io/170421/mocking-modules-in-jest/ * */
jest.unmock('lodash');
const lodash = require.requireActual('lodash');

describe('test players function', () => {
    test('dealCards', () => {
        const players = [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
        ];
        const expected = [
            { id: 1, cards: ['7S', '8S', '9S', '10S', 'AS', 'JS', 'QS', 'KS'] },
            { id: 2, cards: ['7H', '8H', '9H', '10H', 'AH', 'JH', 'QH', 'KH'] },
            { id: 3, cards: ['7D', '8D', '9D', '10D', 'AD', 'JD', 'QD', 'KD'] },
            { id: 4, cards: ['7C', '8C', '9C', '10C', 'AC', 'JC', 'QC', 'KC'] },
        ];
        lodash.shuffle = jest.fn(cards => cards);
        expect(dealCards(players)).toEqual(expected);
    });

    test.only('searchStartPlayer', () => {
        const players = [
            { id: 1, pos: 1 },
            { id: 2, pos: 2 },
            { id: 3, pos: 3 },
            { id: 4, pos: 0 },
        ];
        const expected = { id: 4, pos: 0 };
        expect(players.find(searchStartPlayer)).toEqual(expected);
    });
});
