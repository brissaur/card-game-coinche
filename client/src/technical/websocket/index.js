import { formatMsgForWs } from './services';

const host = 'localhost';
const port = 8080;
const connection = new WebSocket(`ws://${host}:${port}`);

export function getConnection() {
    return connection;
}

export async function wsSend(type, payload, meta) {
    await connection.awaitConnectionOpened;
    connection.send(formatMsgForWs(type, payload, meta));
}

export const CARD_PLAYED_SERVER_WS = 'card/play';
export const ANNOUNCE_SERVER_WS = 'announce/make';
