import get from 'lodash/get';
import { createSelector } from 'reselect';

export function getTableId(state) {
    return get(state, 'table.id');
}

export function getPlayerCards(state) {
    return get(state, 'table.playerCards');
}

export function getTrick(state) {
    return get(state, 'table.trick');
}

export function getTableDocument(state) {
    return get(state, 'table.document');
}

// @ROBIN: @TODO: table WILL change
export const getPlayers = createSelector(
    getTableDocument,
    table =>
        (table
            ? table.players.map(({ id }) => {
                const targetCard = table.trick.find(card => card.playerId === id);

                return {
                    id,
                    cardId: targetCard ? targetCard.cardId : null,
                };
            })
            : []),
);
