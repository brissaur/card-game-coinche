/**
 * https://github.com/erikras/ducks-modular-redux
 *
 * @type {string}
 */
import get from 'lodash/get';
import db from '../api/init';

// actionsType
export const USER_CONNECT_ACTION = 'USER_CONNECT_ACTION';
export const USER_CONNECT_ACTION_SUCCEED = 'USER_CONNECT_ACTION_SUCCEED';
export const USER_CONNECT_ACTION_FAIL = 'USER_CONNECT_ACTION_FAIL';
export const SET_USERNAME_ACTION = 'SET_USERNAME_ACTION';
export const SET_USERNAME_ACTION_SUCCEED = 'SET_USERNAME_ACTION_SUCCEED';
export const SET_USERNAME_ACTION_FAIL = 'SET_USERNAME_ACTION_FAIL';
export const JOIN_USER_TO_TABLE_ACTION = 'JOIN_USER_TO_TABLE_ACTION';

const initialState = {
    username: null,
};

export const setUserName = username => ({
    type: SET_USERNAME_ACTION,
    payload: {
        username,
    },
});
// actions
export function* userConnect(username) {
    return yield db.collection('users').add({
        firstname: username,
    });
}

/**
 * Create a new "table" document (empty)
 * @returns {*}
 */
export function* createTable(){
    // create empty document
    return yield db.collection('tables').add({});
}

/**
 * Return a "table" document
 * @param tableId
 * @returns {*}
 */
export function* getTable(tableId){
    return yield db.collection('tables').doc(tableId);
}

/**
 * @todo Remove that function once multiplayer feature is available
 * @return {array} of user's ID created
 */
export function* createFakeUsers(){
    const usersId = [];
    let result;
    result = yield db.collection('users').add({
        firstname: 'robot1',
    });
    usersId.push(result.id);

    result = yield db.collection('users').add({
        firstname: 'robot2',
    });
    usersId.push(result.id);

    result = yield db.collection('users').add({
        firstname: 'robot3',
    });
    usersId.push(result.id);
    return usersId;
}

/**
 * @todo For now we create systematically a new table with users
 * @returns {*}
 * @param {array} usersId
 * @param {Object} tableDocument
 */
export function* joinUsersToTable(usersId, tableDocument){
    const users = usersId.map((userId) => {
        return {
            id: userId
        }
    });
    console.log('users',users);
    return yield db.collection('tables').doc(tableDocument.id).update({
        users: users,
    });
}


export const getUserName = state => get(state, 'user.username');

// reducer
export function reducer(state = initialState, action) {
    switch (action.type) {
    case SET_USERNAME_ACTION_SUCCEED:
        return {
            ...state,
            username: action.username
        };
    case USER_CONNECT_ACTION_SUCCEED:
        return {
            ...state,
            id: action.id
        };
    default:
        return state;
    }
}
