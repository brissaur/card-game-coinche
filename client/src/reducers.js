import { combineReducers } from 'redux';

import { reducer as userReducer } from './user/duck';
import { reducer as bootstrapReducer } from './bootstrap/duck';

export default combineReducers({
    bootstrap: bootstrapReducer,
    user: userReducer,
});
