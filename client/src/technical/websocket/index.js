import { formatMsgForWs } from './services';

const webSocketUrl = `ws://${process.env.REACT_APP_WEBSOCKET_HOST}:${
    process.env.REACT_APP_WEBSOCKET_PORT
}`;
const connection = new WebSocket(webSocketUrl);

export function getConnection() {
    return connection;
}

export async function wsSend(type, payload, meta) {
    await connection.awaitConnectionOpened;
    connection.send(formatMsgForWs(type, payload, meta));
}

export const CARD_PLAYED_SERVER_WS = 'card/play';
export const ANNOUNCE_SERVER_WS = 'announce/make';
export const CHAT_MESSAGE_WS = 'chat/message';
