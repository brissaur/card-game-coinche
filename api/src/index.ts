import { connection } from './websocket'
import { formatMsgForWs, decodeMsgFromWs } from './websocket/helper';
import {actions as playerActions, onInit} from './players';
import { actions as announceActions } from './announces';
import {IMessage} from "./websocket/types";
import {createFakePlayer} from "./players/model";
import {createTable} from "./tables/model";
import {Session} from "./websocket/session";

const router = (route: string) => {
    const elements = route.split('/');
    return {
        "controller": elements[0],
        "action": elements[1]
    }
};

// When the client connect to the server
connection.on('connection', function connection(ws) {
    global.console.log('New connection:');
    const session = new Session();

    // Whenever the client send a message
    ws.on('message', function incoming(message: string) {
        let parsed = null;
        try {
            parsed = decodeMsgFromWs(message);
            const params = router(parsed.type);
            switch(params.controller){
                case 'player':
                    playerActions[params.action](parsed, ws, session);
                    break;
                case 'announce':
                    announceActions[params.action](ws, session, parsed);
                    break;
                // case 'card':
                    // cardActions[params.action](ws, session, parsed);
                    // break;
            }

            global.console.log('received:', parsed);
        } catch (e) {
            global.console.log('Disconnecting client');
        }
        // @todo: switch parsed.type
    });

    const data = { message: 'Hello' };
    ws.send(formatMsgForWs('hello', data, {}));

    onInit(ws, session);
});
