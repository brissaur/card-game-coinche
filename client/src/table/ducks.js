const SET_TABLE_ID = 'table:set-current-table-id';

const initialState = {
    id: null,
};

export function setTableId(id) {
    return {
        type: SET_TABLE_ID,
        id,
    };
}

export function reducer(state = initialState, action) {
    switch (action.type) {
    case SET_TABLE_ID:
        return {
            ...state,
            id: action.id,
        };
    default:
        return state;
    }
}
