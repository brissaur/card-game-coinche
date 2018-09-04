import { WS_CHAT_MESSAGE } from '../technical/websocket/actions';

export const SEND_MESSAGE = 'chat:send-message';
export const DESTROY_MESSAGE = 'chat:destroy-message';

const initialState = {
    messages: [], // array of { text, playerId }
};

export function sendChatMessage(message) {
    return {
        type: SEND_MESSAGE,
        message,
    };
}

export function destroyChatMessage(message) {
    return {
        type: DESTROY_MESSAGE,
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
    case DESTROY_MESSAGE:
        return {
            ...state,
            messages: state.messages.filter(m => m.text !== action.message),
        };
    default:
        return state;
    }
}
