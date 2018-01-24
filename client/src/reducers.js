import { combineReducers } from 'redux';

import { reducer as playerReducer } from './player/duck';
import { reducer as bootstrapReducer } from './bootstrap/duck';

export default combineReducers({
    bootstrap: bootstrapReducer,
    player: playerReducer,
});
