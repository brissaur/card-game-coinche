import { sortCards, Card, Hand, filterHigherCards, possibleCards, getHighestCard } from './index';

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