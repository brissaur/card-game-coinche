export const SET_PLAYERNAME_ACTION = 'SET_PLAYERNAME_ACTION';
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
