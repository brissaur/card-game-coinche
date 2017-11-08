const initialState = {};

export default function mainReducer(state, action) {
  console.log('new action', action);
  if (typeof state === 'undefined') {
    return initialState;
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}