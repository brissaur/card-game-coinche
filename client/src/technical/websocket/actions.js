const createActionTypeFromWsMessage = wsMessage => `ws::${wsMessage.type}`;
const withWsPrefix = type => `ws::${type}`;

export const WS_PLAYER_CONNECTION = withWsPrefix('player/init');
export const WS_CARD_PLAYED = withWsPrefix('card/played');
export const WS_NEW_ANNOUNCE = withWsPrefix('announce/made');
export const WS_NEW_PLAYER = withWsPrefix('player/join');

export const WS_GAME_START = withWsPrefix('game/start');
export const WS_DEAL_CARDS = withWsPrefix('cards/deal');
export const WS_ACTIVE_PLAYER = withWsPrefix('player/active');
export const WS_ROUND_MODE = withWsPrefix('round/mode');

export const WS_CHAT_MESSAGE = withWsPrefix('chat/message');

export function wsAction(wsMessage) {
    return {
        type: createActionTypeFromWsMessage(wsMessage),
        payload: wsMessage.payload,
    };
}
