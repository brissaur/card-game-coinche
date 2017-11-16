/**
 * https://github.com/erikras/ducks-modular-redux
 *
 * @type {string}
 */
import get from 'lodash/get';
import db from '../api/init';

// actionsType
export const USER_CONNECT_ACTION = 'USER_CONNECT_ACTION';
export const USER_CONNECT_ACTION_SUCCEED = 'USER_CONNECT_ACTION_SUCCEED';
export const USER_CONNECT_ACTION_FAIL = 'USER_CONNECT_ACTION_FAIL';
export const SET_USERNAME_ACTION = 'SET_USERNAME_ACTION';
export const SET_USERNAME_ACTION_SUCCEED = 'SET_USERNAME_ACTION_SUCCEED';
export const SET_USERNAME_ACTION_FAIL = 'SET_USERNAME_ACTION_FAIL';

const initialState = {
    username: null,
};

export const setUserName = username => ({
    type: SET_USERNAME_ACTION,
    payload: {
        username,
    },
});
// actions
export function* userConnect(username) {
    const result = yield db.collection('users').add({
        firstname: username,
    });

    return result;
}

export const getUserName = state => get(state, 'user.username');

// reducer
export function reducer(state = initialState, action) {
    switch (action.type) {
    case SET_USERNAME_ACTION_SUCCEED:
        return {
            ...state,
            username: action.username,
        };
    default:
        return state;
    }
}
