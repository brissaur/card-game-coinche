/**
 * https://github.com/erikras/ducks-modular-redux
 *
 * @type {string}
 */

// actionsType
export const PLAYER_CONNECT_ACTION = 'PLAYER_CONNECT_ACTION';
export const PLAYER_CONNECT_ACTION_SUCCEED = 'PLAYER_CONNECT_ACTION_SUCCEED';
export const PLAYER_CONNECT_ACTION_FAIL = 'PLAYER_CONNECT_ACTION_FAIL';
export const SET_PLAYERNAME_ACTION = 'SET_PLAYERNAME_ACTION';
export const SET_PLAYERNAME_ACTION_SUCCEED = 'SET_PLAYERNAME_ACTION_SUCCEED';
export const SET_PLAYERRNAME_ACTION_FAIL = 'SET_PLAYERNAME_ACTION_FAIL';
export const JOIN_PLAYER_TO_TABLE_ACTION = 'JOIN_PLAYER_TO_TABLE_ACTION';

const initialState = {
    playername: null,
    id: null,
};

export function setPlayerName(playername, id) {
    return {
        type: SET_PLAYERNAME_ACTION,
        playername,
        id,
    };
}

// reducer
export function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYERNAME_ACTION:
            return {
                ...state,
                playername: action.playername,
                id: action.id,
            };
        default:
            return state;
    }
}
