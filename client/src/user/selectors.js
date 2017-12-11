import get from 'lodash/get';

export function getUserName(state) {
    return get(state, 'user.username');
}

export function getUserId(state) {
    return get(state, 'user.id');
}
