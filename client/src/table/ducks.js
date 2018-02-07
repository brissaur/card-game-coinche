const SET_TABLE_ID = 'table:set-current-table-id';
const UPDATE_PLAYER_CARD = 'table:UPDATE_PLAYER_CARD';
const UPDATE_TRICK = 'table:UPDATE_TRICK';
const UPDATE_TABLE_DOCUMENT = 'table:UPDATE_TABLE';

const initialState = {
    id: null,
    document: null,
    trick: [],
    playerCards: [],
};

export function updateTableDocument(table) {
    return {
        type: UPDATE_TABLE_DOCUMENT,
        document: table,
    };
}
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
    case UPDATE_TABLE_DOCUMENT:
        return {
            ...state,
            document: action.document,
        };
    default:
        return state;
    }
}
