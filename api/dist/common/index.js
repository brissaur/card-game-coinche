"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const filterCardsByColor = (color) => (card) => card.color === color;
/**
 * Sort cards from the higher to the lower
 * @return {Function}
 * @param isTrump
 */
exports.sortCards = (isTrump) => (cardA, cardB) => {
    const order = isTrump ? 'trump' : 'notrump';
    const cardAInDeck = constant_1.deckOfThirtyTwoCards.find(card => card.id === cardA.id);
    const cardBInDeck = constant_1.deckOfThirtyTwoCards.find(card => card.id === cardB.id);
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
exports.filterHigherCards = (isTrump, lastHighestCard) => (card) => {
    const cardInDeck = constant_1.deckOfThirtyTwoCards.find(c => c.id === card.id);
    const lastHighestCardInDeck = constant_1.deckOfThirtyTwoCards.find(c => c.id === lastHighestCard.id);
    const trump = isTrump ? 'trump' : 'notrump';
    return cardInDeck.order[trump] < lastHighestCardInDeck.order[trump];
};
/**
 * Get the highestCard of cards
 * @returns {*}
 * @param cards
 * @param trump
 * @param color
 */
exports.getHighestCard = (cards, trump, color) => {
    const filterCards = cards.filter(filterCardsByColor(trump)).sort(exports.sortCards(true))[0] ||
        cards.filter(filterCardsByColor(color)).sort(exports.sortCards(false))[0];
    if (filterCards) {
        return filterCards;
    }
    throw new Error('No trump / color cards found');
};
class Hand {
    constructor(handCards, trump, firstCardOfTrick) {
        this.colorCards = firstCardOfTrick !== undefined ? handCards.filter(filterCardsByColor(firstCardOfTrick.color)) : [];
        this.trumpCards = handCards.filter(filterCardsByColor(trump));
        this.otherCards = handCards.filter((card) => !this.colorCards
            .concat(this.trumpCards)
            .map((c) => c.id));
        //.includes(card.id));
        this.handCards = handCards;
    }
    getColorCards() {
        return this.colorCards.sort(exports.sortCards(false));
    }
    getTrumpCards() {
        return this.trumpCards.sort(exports.sortCards(true));
    }
    getOtherCards() {
        return this.otherCards.sort(exports.sortCards(false));
    }
    getHandsCards() {
        return this.handCards;
    }
}
exports.Hand = Hand;
exports.possibleCards = (trump, currentPlayer, cardsPlayed) => {
    if (cardsPlayed.length > 0) {
        const firstCardOfTheTrick = cardsPlayed[0];
        const isTrump = firstCardOfTheTrick.color === trump;
        const highestCardOfTrick = exports.getHighestCard(cardsPlayed, trump, firstCardOfTheTrick.color);
        const hand = new Hand(currentPlayer.cards, trump, firstCardOfTheTrick);
        if (isTrump) {
            if (hand.getTrumpCards().length > 0) {
                const higherCardInHand = hand.getTrumpCards().filter(exports.filterHigherCards(true, highestCardOfTrick));
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
                .filter(exports.filterHigherCards(true, highestCardOfTrick))
                .sort(exports.sortCards(true));
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
//# sourceMappingURL=index.js.map