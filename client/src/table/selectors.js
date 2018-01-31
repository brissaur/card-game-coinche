import get from 'lodash/get';

export function getTableId(state) {
    return get(state, 'table.id');
}

export function getPlayerCards(state) {
    return get(state, 'table.playerCards');
}

export function getTrick(state) {
    return get(state, 'table.trick');
}
