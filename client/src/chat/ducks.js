import { WS_CHAT_MESSAGE } from '../technical/websocket/actions';

export const SEND_MESSAGE = 'chat:send-message';

const initialState = {
    messages: [], // array of { text, playerId }
};

export function sendChatMessage(message) {
    return {
        type: SEND_MESSAGE,
        message,
    };
}

export function chatReducer(state = initialState, action) {
    switch (action.type) {
    case WS_CHAT_MESSAGE:
        return {
            ...state,
            messages: state.messages.concat([
                { text: action.payload.message, playerId: 'robin' },
            ]),
        };
    default:
        return state;
    }
}
