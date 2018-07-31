import WebSocket from 'ws';
import * as config from '../build.properties';

export const connection = new WebSocket.Server({
    port: config.WEBSOCKET_PORT
}, () => {
    global.console.log('Server listening for WS on port ' + config.WEBSOCKET_PORT);
});

export const CARD_PLAYED_SERVER_WS = 'card/played';
export const ANNOUNCE_SERVER_WS = 'card/played';