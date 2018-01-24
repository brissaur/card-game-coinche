import get from 'lodash/get';

export function getPlayerName(state) {
    return get(state, 'player.playername');
}

export function getPlayerId(state) {
    return get(state, 'player.id');
}
