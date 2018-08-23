import { connection } from './websocket'
const { formatMsgForWs, decodeMsgFromWs } = require('./websocket/helper');
import {actions as playerActions, onInit} from './players';
import {IMessage} from "./websocket/types";
import {repository as playerRepository} from "./repository/PlayerRepository";
import {createFakePlayer} from "./players/model";
import {createTable, modeAnnounce} from "./tables/model";

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

    // Whenever the client send a message
    ws.on('message', function incoming(message: IMessage) {
        let parsed = null;
        try {
            parsed = decodeMsgFromWs(message);
            const params = router(parsed.type);
            switch(params.controller){
                case 'player':
                    playerActions[params.action](parsed, ws);
                    break;
            }

            global.console.log('received:', parsed);
        } catch (e) {
            global.console.log('Disconnecting client');
        }
        // @todo: switch parsed.type
    });

    const data = { message: 'Hello' };
    ws.send(formatMsgForWs('hello', data));

    onInit(ws);
});
