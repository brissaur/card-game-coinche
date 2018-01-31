const SET_TABLE_ID = 'table:set-current-table-id';
const UPDATE_PLAYER_CARD = 'table:UPDATE_PLAYER_CARD';

const initialState = {
    id: null,
    playerCards: [],
};

export function setTableId(id) {
    return {
        type: SET_TABLE_ID,
        id,
    };
}

export function updatePlayerCard(cards) {
    return {
        type: UPDATE_PLAYER_CARD,
        cards,
    };
}

export function reducer(state = initialState, action) {
    switch (action.type) {
    case SET_TABLE_ID:
        return {
            ...state,
            id: action.id,
        };
    case UPDATE_PLAYER_CARD:
        return {
            ...state,
            playerCards: action.cards,
        };
    default:
        return state;
    }
}
