import { actions as announceActions } from './announces';
import { chatActions } from './chat/index';
import { actions as playerActions } from './players';
import { connection } from './websocket';
import { decodeMsgFromWs, formatMsgForWs } from './websocket/helper';

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

    // Whenever the client send a message
    ws.on('message', (message: string) => {
        let parsed = null;
        try {
            parsed = decodeMsgFromWs(message);
            const params = router(parsed.type);
            switch (params.controller) {
            case 'chat':
                chatActions[params.action as 'message'](parsed, connection);
                break;
            case 'player':
                playerActions[params.action](parsed, ws);
                break;
            case 'announce':
                console.log('icccci');
                announceActions[params.action](parsed);
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

    // onInit(ws);
});
