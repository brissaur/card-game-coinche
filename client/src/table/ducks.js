const SET_TABLE_ID = 'table:set-current-table-id';
const UPDATE_PLAYERS = 'table:UPDATE_PLAYERS';
const UPDATE_TRICK = 'table:UPDATE_TRICK';
const UPDATE_ANNOUNCES = 'table:UPDATE_ANNOUNCES';
const UPDATE_TABLE_DOCUMENT = 'table:UPDATE_TABLE';

const initialState = {
    id: null,
    trick: [],
    general: {},
    players: [],
    announces: [],
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

export function updateAnnounces(announces) {
    return {
        type: UPDATE_ANNOUNCES,
        announces,
    };
}

export function setTableId(id) {
    return {
        type: SET_TABLE_ID,
        id,
    };
}

export function updatePlayers(players) {
    return {
        type: UPDATE_PLAYERS,
        players,
    };
}

export function reducer(state = initialState, action) {
    switch (action.type) {
    case SET_TABLE_ID:
        return {
            ...state,
            id: action.id,
        };
    case UPDATE_PLAYERS:
        return {
            ...state,
            players: action.players,
        };
    case UPDATE_TRICK:
        return {
            ...state,
            trick: action.trick,
        };
    case UPDATE_ANNOUNCES:
        return {
            ...state,
            announces: action.announces,
        };
    case UPDATE_TABLE_DOCUMENT:
        return {
            ...state,
            ...action.document,
        };
    default:
        return state;
    }
}
