import get from 'lodash/get';
import { createSelector } from 'reselect';

import { getPlayerId } from '../player/selectors';

export function getTableId(state) {
    return get(state, 'table.id');
}

export function getTrick(state) {
    return get(state, 'table.trick');
}

export function getPlayersRaw(state) {
    return get(state, 'table.players');
}

// eslint-disable-next-line no-nested-ternary
const byPos = (a, b) => (a.pos === b.pos ? 0 : a.pos > b.pos ? 1 : -1);

export const getPlayers = createSelector(getPlayersRaw, getTrick, (players, trick) =>
    players.sort(byPos).map(player => ({
        ...player,
        cardPlayed: (trick.find(card => card.playerId === player.id) || {}).cardId,
    })));

export const getMyPlayer = createSelector(getPlayersRaw, getPlayerId, (players, myPlayerId) =>
    players.find(({ id }) => id === myPlayerId));

export const getPlayerCards = createSelector(getMyPlayer, me => (me && me.cards ? me.cards : []));

export function getGeneral(state) {
    return get(state, 'table.document');
}

export const getCurrentPlayerId = createSelector(getGeneral, general => general.currentPlayerId);
