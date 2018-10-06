import { actions as announceActions } from './announces';
import { Session } from './websocket/session';
import { chatActions } from './chat';
import { actions as playerActions, onInit } from './players';
import { connection } from './websocket';
import { decodeMsgFromWs, formatMsgForWs } from './websocket/helper';
import {actions as cardActions} from './cardsPlayed';

const router = (route: string) => {
    const elements = route.split('/');

    return {
        controller: elements[0],
        action: elements[1],
    };
};

// When the client connect to the server
connection.on('connection', (ws) => {
    global.console.log('New connection:');
    const session = new Session();

    // Whenever the client send a message
    ws.on('message', (message: string) => {
        let parsed = null;
        try {
            parsed = decodeMsgFromWs(message);
            const params = router(parsed.type);
            switch (params.controller) {
            case 'player':
                playerActions[params.action](parsed, ws, session);
                break;
            case 'announce':
                announceActions[params.action](ws, session, parsed);
                break;
            case 'chat':
                chatActions[params.action as 'message'](parsed, connection);
                break;
            case 'card':
                cardActions[params.action](ws, session, parsed);
                break;
            }

            global.console.log('received:', parsed);
        } catch (e) {
            global.console.log('Disconnecting client');
        }
        // @todo: switch parsed.type
    });

    const data = { message: 'Hello' };
    ws.send(formatMsgForWs('hello', data, {}));

    playerActions['init'](ws, session);
});
