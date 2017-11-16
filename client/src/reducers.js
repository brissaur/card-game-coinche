import { reducer as userReducer } from './users/duck';

const initialState = {};

export default function mainReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    // For now, don't handle any actions
    // and just return the state given to us.
    return {
        user: userReducer(state.user, action),
    };
}
