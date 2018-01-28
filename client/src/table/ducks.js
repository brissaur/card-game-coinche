const SET_TABLE_ID = 'table:set-current-table-id';
const DEAL_CARDS_TO_PLAYER = 'table:DEAL_CARDS_TO_PLAYER';

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

export function dealCardsToPlayer(cards) {
    return {
        type: DEAL_CARDS_TO_PLAYER,
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
    case DEAL_CARDS_TO_PLAYER:
        return {
            ...state,
            playerCards: action.cards,
        };
    default:
        return state;
    }
}
