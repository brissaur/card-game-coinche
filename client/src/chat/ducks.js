export const SEND_MESSAGE = 'chat:send-message';

export function sendChatMessage(message) {
    return {
        type: SEND_MESSAGE,
        message,
    };
}
