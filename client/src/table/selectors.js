import get from 'lodash/get';
import { createSelector } from 'reselect';

import { getPlayerId } from '../player/selectors';

export function getTableId(state) {
    return get(state, 'table.id');
}

export function getTrick(state) {
    return get(state, 'table.trick');
}

export function getPlayers(state) {
    return get(state, 'table.players');
}

export const getMyPlayer = createSelector(getPlayers, getPlayerId, (players, myPlayerId) =>
    players.find(({ id }) => id === myPlayerId));

export const getPlayerCards = createSelector(getMyPlayer, me => (me && me.cards ? me.cards : []));

export function getGeneral(state) {
    return get(state, 'table.document');
}

export const getCurrentPlayerId = createSelector(getGeneral, general => general.currentPlayerId);
