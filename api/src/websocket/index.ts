import WebSocket from 'ws';
import * as config from '../build.properties';

export const connection = new WebSocket.Server({
    port: config.WEBSOCKET_PORT
}, () => {
    global.console.log('Server listening for WS on port ' + config.WEBSOCKET_PORT);
});

export const CARD_PLAYED_SERVER_WS = 'card/played';
export const ANNOUNCE_SERVER_WS = 'announce/make';
export const PLAYER_INIT_SERVER_WS = 'player/init';
export const PLAYER_JOIN_SERVER_WS = 'player/join';
export const PLAYER_ACTIVE_SERVER_WS = 'player/active';
export const GAME_START_SERVER_WS = 'game/start';
export const CARDS_DEAL_SERVER_WS = 'cards/deal';
