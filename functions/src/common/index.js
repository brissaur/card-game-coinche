import { deckOfThirtyTwoCards } from './constant';

const filterCardsByColor = color => card => card.color === color;

/**
 * Sort cards from the higher to the lower
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
 * Filter cards and return card with order > lastHigherCard
 * @param isTrump
 * @param lastHighestCard
 * @returns {function(*): boolean}
 */
export const filterHigherCards = (isTrump, lastHighestCard) => (card) => {
    const cardInDeck = deckOfThirtyTwoCards.find(c => c.id === card.id);
    const lastHighestCardInDeck = deckOfThirtyTwoCards.find(c => c.id === lastHighestCard.id);
    const trump = isTrump ? 'trump' : 'notrump';

    return cardInDeck.order[trump] < lastHighestCardInDeck.order[trump];
};

/**
 * Get the highestCard of cards
 * @param Card[] cards
 * @param string trump
 * @param string color
 * @returns {*}
 */
export const getHighestCard = (cards, trump, color) =>
    cards.filter(filterCardsByColor(trump)).sort(sortCards(true))[0] ||
    cards.filter(filterCardsByColor(color)).sort(sortCards(false))[0] ||
    new Error('No trump / color cards found');

export class Hand {
    constructor(handCards, trump, firstCardOfTrick) {
        this.colorCards = firstCardOfTrick !== undefined ? handCards.filter(filterCardsByColor(firstCardOfTrick.color)) : [];
        this.trumpCards = handCards.filter(filterCardsByColor(trump));
        this.otherCards = handCards.filter(card =>
            !this.colorCards
                .concat(this.trumpCards)
                .map(c => c.id)
                .includes(card.id));
        this.handCards = handCards;
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

    getHandsCards() {
        return this.handCards;
    }
}

export const possibleCards = (trump, currentPlayer, cardsPlayed) => {
    if (cardsPlayed.length > 0) {
        const firstCardOfTheTrick = cardsPlayed[0];
        const isTrump = firstCardOfTheTrick.color === trump;
        const highestCardOfTrick = getHighestCard(cardsPlayed, trump, firstCardOfTheTrick.color);
        const hand = new Hand(currentPlayer.cards, trump, firstCardOfTheTrick);
        if (isTrump) {
            if (hand.getTrumpCards().length > 0) {
                const higherCardInHand = hand.getTrumpCards().filter(filterHigherCards(true, highestCardOfTrick));
                if (higherCardInHand.length > 0) {
                    return higherCardInHand;
                }

                return hand.getTrumpCards();
            }

            return hand.getOtherCards();
        }
        if (hand.getColorCards().length > 0) {
            return hand.getColorCards();
        }
        const partnerCard = cardsPlayed.length > 1 ? cardsPlayed[cardsPlayed.length - 2] : null;
        // partner is the master of trick
        if (partnerCard === highestCardOfTrick) {
            // I can play whatever I want
            return hand.getHandsCards();
        }
        const trumpCards = cardsPlayed.filter(filterCardsByColor(trump));
        // At least one trump card was played, and I have trump cards
        if (trumpCards.length > 0 && hand.getTrumpCards().length > 0) {
            const higherCardInHand = hand
                .getTrumpCards()
                .filter(filterHigherCards(true, highestCardOfTrick))
                .sort(sortCards(true));
            // I have higher card
            if (higherCardInHand.length > 0) {
                return higherCardInHand;
            }

            return hand.getTrumpCards();
        }

        // I can't play a trump, so I discard
        return hand.getOtherCards();
    }
    const hand = new Hand(currentPlayer.cards, trump);

    return hand.getHandsCards();
};

export function Card(id) {
    this.id = id;
    this.color = this.getCardColor(id);
    this.height = this.getCardHeight(id);
}

Card.prototype.getCardColor = cardId => cardId.slice(-1);
Card.prototype.getCardHeight = cardId => cardId.slice(0, cardId.length - 1);
