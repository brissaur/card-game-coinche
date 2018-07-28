const createActionTypeFromWsMessage = wsMessage => `ws::${wsMessage.type}`;
const withWsPrefix = type => `ws::${type}`;

export const WS_PLAYER_CONNECTION = withWsPrefix('player_connection');
export const WS_CARD_PLAYED = withWsPrefix('card_played');
export const WS_NEW_ANNOUNCE = withWsPrefix('new_announce');
export const WS_NEW_PLAYER = withWsPrefix('new_player');

export function wsAction(wsMessage) {
    return {
        type: createActionTypeFromWsMessage(wsMessage),
        payload: wsMessage.payload,
    };
}
