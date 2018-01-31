const SET_TABLE_ID = 'table:set-current-table-id';
const UPDATE_PLAYER_CARD = 'table:UPDATE_PLAYER_CARD';
const UPDATE_TRICK = 'table:UPDATE_TRICK';

const initialState = {
    id: null,
    playerCards: [],
    trick: [],
};

export function updateTrick(trick) {
    return {
        type: UPDATE_TRICK,
        trick,
    };
}

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
    case UPDATE_TRICK:
        return {
            ...state,
            trick: action.trick,
        };
    default:
        return state;
    }
}
