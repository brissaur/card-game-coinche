export const CARD_PLAYED = 'card:played';

export function cardPlayed(card) {
    return {
        type: CARD_PLAYED,
        card,
    };
}
