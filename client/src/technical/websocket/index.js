import { formatMsgForWs } from './services';
import * as config from '../../build.properties';

const connection = new WebSocket(`ws://${config.WEBSOCKET_HOST}:${config.WEBSOCKET_PORT}`);

export function getConnection() {
    return connection;
}

export async function wsSend(type, payload, meta) {
    await connection.awaitConnectionOpened;
    connection.send(formatMsgForWs(type, payload, meta));
}

export const CARD_PLAYED_SERVER_WS = 'card/play';
export const ANNOUNCE_SERVER_WS = 'announce/make';
