import { getHighestCard, Card } from '../common/index';

/**
 *
 * @param cardsPlayed [{playerId: XXXX, cardId: XXXX}]
 * @param trump
 * @return playerId
 */
export const selectWinnerOfTrick = (cardsPlayed, trump) => {
    const firstCardColor = new Card(cardsPlayed[0].cardId).color;
    const highestCard = getHighestCard(cardsPlayed.map((cardPlayed) => new Card(cardPlayed.cardId)), trump, firstCardColor);

    const winningCard = cardsPlayed.filter((cardPlayed) => {
        return cardPlayed.cardId === highestCard.id
    });
    return winningCard[0].playerId;
};