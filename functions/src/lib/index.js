export const possibleCards = (trump, currentPlayer, cardsPlayed) => {
    // get the first card of the cardsPlayed
    // if first card of the trick is === trump
        // get the higher trump card of the trick
        // AA) list of trump card of the hand
        // list of other card

        // if cards > 0
            //  Player has a cards > to the the higher card of the trick
                // return all cards > to the higher one
            // else return all others cards
    // else (first card is none a trump one)
        // player has trump one

        // else
        // is there any trump card which was played
            // player should play a trump card. See AA section
        // else player has color card in hand ?
            // return colors cards

        // else list all others cards

    //---------------------------------------------------------
    const firstCardOfTheTrick = cardsPlayed[0].cardId;
    const firstColorCardColor = getCardColor(firstCardOfTheTrick);
    if(checkIfCardIsBelongToColor(trump, firstCardOfTheTrick)){

    }else{

    }
};

export const filterCardsByColor = (color) => (card) => {
    return checkIfCardIsBelongToColor(color, card);
};

export const checkIfCardIsBelongToColor = (color, card) => {
    return getCardColor(card) === color;
};

const getTrumpCards = (trump, cards) => {
    return cards.filter((card) => checkIfCardIsBelongToTrump(trump, card));
};

/**
 * Return the color of the card
 * @param card
 */
export const getCardColor = (card) => {
    return card.slice(-1);
};

const hand = {
    colorCards: [],
    trumpCards: [],
    otherCards: [],
};

const negate = (f) => (elm) => f(!elm);

class Hand {

    constructor(hand, trump, firstCardColor){
        this.colorCards = hand.filter(filterCardsByColor(firstCardColor));
        this.trumpCards = hand.filter(filterCardsByColor(trump));
        this.otherCards = hand.filter(
            negate(this.colorCards.concat(this.trumpCards).includes)
        );
    }
}