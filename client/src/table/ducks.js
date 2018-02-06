const SET_TABLE_ID = 'table:set-current-table-id';
const UPDATE_PLAYER_CARD = 'table:UPDATE_PLAYER_CARD';
const UPDATE_TRICK = 'table:UPDATE_TRICK';
const UPDATE_CURRENT_PLAYER = 'table:UPDATE_CURRENT_PLAYER';

const initialState = {
    id: null,
    playerCards: [],
    trick: [],
    state: {}
};

export function updateTrick(trick) {
    return {
        type: UPDATE_TRICK,
        trick,
    };
}

export function updateCurrentPlayer(currentPlayerId){
    return {
        type: UPDATE_CURRENT_PLAYER,
        currentPlayerId
    }
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
    case UPDATE_CURRENT_PLAYER:
        return {
            ...state,
            state: {
                ...state.state,
                currentPlayerId: action.currentPlayerId
            }
        };
    default:
        return state;
    }
}
