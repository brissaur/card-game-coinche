import WebSocket from 'ws';
import * as config from '../build.properties';

export const connection = new WebSocket(`ws://${config.WEBSOCKET_HOST}:${config.WEBSOCKET_PORT}`);

export const CARD_PLAYED_SERVER_WS = 'card/played';
export const ANNOUNCE_SERVER_WS = 'card/played';