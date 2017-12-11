/**
 * https://github.com/erikras/ducks-modular-redux
 *
 * @type {string}
 */

// actionsType
export const USER_CONNECT_ACTION = 'USER_CONNECT_ACTION';
export const USER_CONNECT_ACTION_SUCCEED = 'USER_CONNECT_ACTION_SUCCEED';
export const USER_CONNECT_ACTION_FAIL = 'USER_CONNECT_ACTION_FAIL';
export const SET_USERNAME_ACTION = 'SET_USERNAME_ACTION';
export const SET_USERNAME_ACTION_SUCCEED = 'SET_USERNAME_ACTION_SUCCEED';
export const SET_USERNAME_ACTION_FAIL = 'SET_USERNAME_ACTION_FAIL';
export const JOIN_USER_TO_TABLE_ACTION = 'JOIN_USER_TO_TABLE_ACTION';

const initialState = {
    username: null,
    id: null,
};

export function setUserName(username, id) {
    return {
        type: SET_USERNAME_ACTION,
        username,
        id,
    };
}

// reducer
export function reducer(state = initialState, action) {
    switch (action.type) {
    case SET_USERNAME_ACTION:
        return {
            ...state,
            username: action.username,
            id: action.id,
        };
    default:
        return state;
    }
}
