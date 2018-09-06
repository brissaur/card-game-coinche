import { deckOfThirtyTwoCards } from './constant';
import {Player} from "../players/model";
import { Card, ICard } from "../cardsPlayed/model";

const filterCardsByColor = (color: string) => (card: ICard) => card.getCardColor() === color;

/**
 * Sort cards from the higher to the lower
 * @return {Function}
 * @param isTrump
 */
export const sortCards = (isTrump: boolean) => (cardA: ICard, cardB: ICard) => {
    const order = isTrump ? 'trump' : 'notrump';
    const cardAInDeck = deckOfThirtyTwoCards.find(card => card.id === cardA.getCardId());
    const cardBInDeck = deckOfThirtyTwoCards.find(card => card.id === cardB.getCardId());
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
export const filterHigherCards = (isTrump: boolean, lastHighestCard: ICard) => (card: ICard) => {
    const cardInDeck = deckOfThirtyTwoCards.find(c => c.id === card.getCardId());
    const lastHighestCardInDeck = deckOfThirtyTwoCards.find(c => c.id === lastHighestCard.getCardId());
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
export const getHighestCard = (cards: ICard[], trump: string, color: string): ICard => {
    const filterCards = cards.filter(filterCardsByColor(trump)).sort(sortCards(true))[0] ||
        cards.filter(filterCardsByColor(color)).sort(sortCards(false))[0];
    if (filterCards){
        return filterCards;
    }
    throw new Error('No trump / color cards found');
};

export class Hand {
    colorCards: ICard[];
    trumpCards: ICard[];
    otherCards: ICard[];
    handCards: ICard[];
    constructor(handCards: ICard[], trump: string, firstCardOfTrick?: ICard) {
        this.colorCards = firstCardOfTrick !== undefined ? handCards.filter(filterCardsByColor(firstCardOfTrick.getCardColor())) : [];
        this.trumpCards = handCards.filter(filterCardsByColor(trump));
        this.otherCards = handCards.filter((card: ICard) =>
            !this.colorCards
                .concat(this.trumpCards)
                .map((c: ICard) => c.getCardId())
                .includes(card.getCardId()));
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

export const possibleCards = (trump: string, currentPlayer: Player, cardsPlayed: Card[]): ICard[] => {
    if (cardsPlayed.length > 0) {
        const firstCardOfTheTrick = cardsPlayed[0];
        const isTrump = firstCardOfTheTrick.getCardColor() === trump;
        const highestCardOfTrick = getHighestCard(cardsPlayed, trump, firstCardOfTheTrick.getCardColor());
        const hand = new Hand(currentPlayer.getCards(), trump, firstCardOfTheTrick);
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
    const hand = new Hand(currentPlayer.getCards(), trump);

    return hand.getHandsCards();
};