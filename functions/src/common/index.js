const deckOfThirtyTwoCards = [
    {
        id: '7S',
        height: '7',
        color: 'S',
        order: {
            trump: 8,
            notrump: 8,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '8S',
        height: '8',
        color: 'S',
        order: {
            trump: 8,
            notrump: 7,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '9S',
        height: '9',
        color: 'S',
        order: {
            trump: 2,
            notrump: 6,
        },
        value: {
            trump: 14,
            notrump: 0,
        },
    },
    {
        id: '10S',
        height: '10',
        color: 'S',
        order: {
            trump: 4,
            notrump: 2,
        },
        value: {
            trump: 10,
            notrump: 10,
        },
    },
    {
        id: 'AS',
        height: 'A',
        color: 'S',
        order: {
            trump: 3,
            notrump: 1,
        },
        value: {
            trump: 11,
            notrump: 11,
        },
    },
    {
        id: 'JS',
        height: 'J',
        color: 'S',
        order: {
            trump: 1,
            notrump: 5,
        },
        value: {
            trump: 20,
            notrump: 2,
        },
    },
    {
        id: 'QS',
        height: 'Q',
        color: 'S',
        order: {
            trump: 6,
            notrump: 4,
        },
        value: {
            trump: 3,
            notrump: 3,
        },
    },
    {
        id: 'KS',
        height: 'K',
        color: 'S',
        order: {
            trump: 5,
            notrump: 3,
        },
        value: {
            trump: 4,
            notrump: 4,
        },
    },
    {
        id: '7H',
        height: '7',
        color: 'H',
        order: {
            trump: 8,
            notrump: 8,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '8H',
        height: '8',
        color: 'H',
        order: {
            trump: 7,
            notrump: 7,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '9H',
        height: '9',
        color: 'H',
        order: {
            trump: 2,
            notrump: 6,
        },
        value: {
            trump: 14,
            notrump: 0,
        },
    },
    {
        id: '10H',
        height: '10',
        color: 'H',
        order: {
            trump: 4,
            notrump: 2,
        },
        value: {
            trump: 10,
            notrump: 10,
        },
    },
    {
        id: 'AH',
        height: 'A',
        color: 'H',
        order: {
            trump: 3,
            notrump: 1,
        },
        value: {
            trump: 11,
            notrump: 11,
        },
    },
    {
        id: 'JH',
        height: 'J',
        color: 'H',
        order: {
            trump: 1,
            notrump: 5,
        },
        value: {
            trump: 20,
            notrump: 2,
        },
    },
    {
        id: 'QH',
        height: 'Q',
        color: 'H',
        order: {
            trump: 6,
            notrump: 4,
        },
        value: {
            trump: 3,
            notrump: 3,
        },
    },
    {
        id: 'KH',
        height: 'K',
        color: 'H',
        order: {
            trump: 5,
            notrump: 3,
        },
        value: {
            trump: 4,
            notrump: 4,
        },
    },
    {
        id: '7D',
        height: '7',
        color: 'D',
        order: {
            trump: 8,
            notrump: 8,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '8D',
        height: '8',
        color: 'D',
        order: {
            trump: 8,
            notrump: 7,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '9D',
        height: '9',
        color: 'D',
        order: {
            trump: 2,
            notrump: 6,
        },
        value: {
            trump: 14,
            notrump: 0,
        },
    },
    {
        id: '10D',
        height: '10',
        color: 'D',
        order: {
            trump: 4,
            notrump: 2,
        },
        value: {
            trump: 10,
            notrump: 10,
        },
    },
    {
        id: 'AD',
        height: 'A',
        color: 'D',
        order: {
            trump: 3,
            notrump: 1,
        },
        value: {
            trump: 11,
            notrump: 11,
        },
    },
    {
        id: 'JD',
        height: 'J',
        color: 'D',
        order: {
            trump: 1,
            notrump: 5,
        },
        value: {
            trump: 20,
            notrump: 2,
        },
    },
    {
        id: 'QD',
        height: 'Q',
        color: 'D',
        order: {
            trump: 6,
            notrump: 4,
        },
        value: {
            trump: 3,
            notrump: 3,
        },
    },
    {
        id: 'KD',
        height: 'K',
        color: 'D',
        order: {
            trump: 5,
            notrump: 3,
        },
        value: {
            trump: 4,
            notrump: 4,
        },
    },
    {
        id: '7C',
        height: '7',
        color: 'C',
        order: {
            trump: 8,
            notrump: 8,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '8C',
        height: '8',
        color: 'C',
        order: {
            trump: 8,
            notrump: 7,
        },
        value: {
            trump: 0,
            notrump: 0,
        },
    },
    {
        id: '9C',
        height: '9',
        color: 'C',
        order: {
            trump: 2,
            notrump: 6,
        },
        value: {
            trump: 14,
            notrump: 0,
        },
    },
    {
        id: '10C',
        height: '10',
        color: 'C',
        order: {
            trump: 4,
            notrump: 2,
        },
        value: {
            trump: 10,
            notrump: 10,
        },
    },
    {
        id: 'AC',
        height: 'A',
        color: 'C',
        order: {
            trump: 3,
            notrump: 1,
        },
        value: {
            trump: 11,
            notrump: 11,
        },
    },
    {
        id: 'JC',
        height: 'J',
        color: 'C',
        order: {
            trump: 1,
            notrump: 5,
        },
        value: {
            trump: 20,
            notrump: 2,
        },
    },
    {
        id: 'QC',
        height: 'Q',
        color: 'C',
        order: {
            trump: 6,
            notrump: 4,
        },
        value: {
            trump: 3,
            notrump: 3,
        },
    },
    {
        id: 'KC',
        height: 'K',
        color: 'C',
        order: {
            trump: 5,
            notrump: 3,
        },
        value: {
            trump: 4,
            notrump: 4,
        },
    },
];

const filterCardsByColor = color => card => card.color === color;

/**
 * Return the higher card in the cardsList
 * @param boolean isTrump
 * @return {Function}
 */
export const sortCards = isTrump => (cardA, cardB) => {
    const order = isTrump ? 'trump' : 'notrump';
    const cardAInDeck = deckOfThirtyTwoCards.find(card => card.id === cardA.id);
    const cardBInDeck = deckOfThirtyTwoCards.find(card => card.id === cardB.id);
    if (cardAInDeck.order[order] > cardBInDeck.order[order]) {
        return 1;
    }
    if (cardAInDeck.order[order] < cardBInDeck.order[order]) {
        return -1;
    }

    return 0;
};

/**
 * Filter cards and return card with value > lastHigherCard
 * @param isTrump
 * @param lastHighestCard
 * @returns {function(*): boolean}
 */
export const filterHigherCards = (isTrump, lastHighestCard) => (card) => {
    const cardInDeck = deckOfThirtyTwoCards.find(c => c.id === card.id);
    const lastHighestCardInDeck = deckOfThirtyTwoCards.find(c => c.id === lastHighestCard.id);
    const trump = isTrump ? 'trump' : 'notrump';

    return cardInDeck.value[trump] > lastHighestCardInDeck.value[trump];
};

export class Hand {
    constructor(handCards, trump, firstCardOfTrick) {
        this.colorCards = handCards.filter(filterCardsByColor(firstCardOfTrick.color));
        this.trumpCards = handCards.filter(filterCardsByColor(trump));
        this.otherCards = handCards.filter(card => !this.colorCards.concat(this.trumpCards).map(c => c.id).includes(card.id));
    }

    getColorCards() {
        return this.colorCards.sort(sortCards(false));
    }

    getTrumpCards() {
        return this.trumpCards.sort(sortCards(true));
    }

    getOtherCards() {
        return this.otherCards.sort(sortCards(false));
    }
}

export const possibleCards = (trump, currentPlayer, cardsPlayed) => {
    const firstCardOfTheTrick = cardsPlayed[0];
    if (firstCardOfTheTrick.color === trump) {
        const highestCardOfTrick = cardsPlayed.sort(sortCards(true))[0];
        const hand = new Hand(currentPlayer.cards, trump, firstCardOfTheTrick.color, highestCardOfTrick);
        if (hand.getTrumpCards().length > 0) {
            const higherCardInHand = hand.getTrumpCards().filter(filterHigherCards(true, highestCardOfTrick));
            if (higherCardInHand.length > 0) {
                return higherCardInHand;
            }

            return hand.getTrumpCards();
        }

        return hand.getOtherCards();
    }
    const highestCardOfTrick = cardsPlayed.sort(sortCards(false))[0];
    const hand = new Hand(currentPlayer.cards, trump, firstCardOfTheTrick.color, highestCardOfTrick);
    const trumpCards = cardsPlayed.filter(filterCardsByColor(trump));
    if (trumpCards.length > 0 && hand.getTrumpCards().length > 0) {
        return hand.getTrumpCards();
    } else if (hand.getColorCards().length > 0) {
        return hand.getColorCards();
    }

    return hand.getOtherCards();
};

export function Card(id) {
    this.id = id;
    this.color = this.getCardColor(id);
    this.height = this.getCardHeight(id);
}

Card.prototype.getCardColor = cardId => cardId.slice(-1);
Card.prototype.getCardHeight = cardId => cardId.slice(0, cardId.length - 1);
