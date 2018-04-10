import get from 'lodash/get';
import { createSelector } from 'reselect';

import { getPlayerId } from '../player/selectors';

const isEqual = (a, b) => a === b;

export function getTableId(state) {
    return get(state, 'table.id');
}

export function getTrick(state) {
    return get(state, 'table.trick');
}

export function getAnnounces(state) {
    return get(state, 'table.announces');
}

export function getPlayersRaw(state) {
    return get(state, 'table.players');
}

export const getMyPlayer = createSelector(getPlayersRaw, getPlayerId, (players, myPlayerId) =>
    players.find(({ id }) => id === myPlayerId));

export const getPlayerCards = createSelector(
    getMyPlayer,
    me => console.log('me', me && me.cards) || (me && me.cards ? me.cards : []),
);

export function getGeneral(state) {
    return get(state, 'table', {});
}

export const getGameMode = createSelector(getGeneral, general => general.mode);

export const isGameModeAnnounce = createSelector(getGameMode, gameMode => gameMode === 'announce');
export const getCurrentPlayerId = createSelector(getGeneral, general => general.currentPlayerId);
export const isActivePlayer = createSelector(getPlayerId, getCurrentPlayerId, isEqual);

export const isMyTurn = createSelector(
    getCurrentPlayerId,
    getMyPlayer,
    (currentPlayerId, myPlayer) => (myPlayer ? myPlayer.id === currentPlayerId : false),
);
// eslint-disable-next-line no-nested-ternary
const byPos = (a, b) => (a.pos === b.pos ? 0 : a.pos > b.pos ? 1 : -1);

export const getPlayers = createSelector(
    getPlayersRaw,
    getTrick,
    getCurrentPlayerId,
    getAnnounces,
    (players, trick, currentPlayerId, announces) =>
        players.sort(byPos).map(player => ({
            ...player,
            cardPlayed: (trick.find(card => card.playerId === player.id) || {}).cardId,
            announce: (announces.find(announce => announce.playerId === player.id) || {}).announce,
            active: player.id === currentPlayerId,
        })),
);
