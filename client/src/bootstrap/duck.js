export const APP_LOADED = 'bootstrap:app-loaded';

const initialState = {
    isLoaded: false,
    error: null,
};

export function setAppLoaded(error = null) {
    return {
        type: APP_LOADED,
        error,
    };
}

export function reducer(state = initialState, action) {
    switch (action.type) {
    case APP_LOADED:
        return {
            isLoaded: true,
            error: action.error,
        };
    default:
        return state;
    }
}
