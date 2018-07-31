import { connection } from './websocket'
const { formatMsgForWs, decodeMsgFromWs } = require('./websocket/helper');
import { createPlayer, actions as playersAction } from './players';

const router = (route: string) => {
    const elements = route.split('/');
    return {
        "controller": elements[0],
        "action": elements[1]
    }
};

connection.on('connection', function connection(ws) {
    global.console.log('New connection:');




    ws.on('message', function incoming(message) {
        let parsed = null;
        try {
            parsed = decodeMsgFromWs(message);
            const params = router(parsed.type);
            switch(params.controller){
                case 'player':
                    return playersAction[params.action](parsed);
                    //
            }

            global.console.log('received:', parsed);
        } catch (e) {
            global.console.log('Disconnecting client');
        }
        // @todo: switch parsed.type
    });

    const data = { message: 'Hello' };
    ws.send(formatMsgForWs('hello', data));
});
