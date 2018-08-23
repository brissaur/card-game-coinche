"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = require("./websocket");
const { formatMsgForWs, decodeMsgFromWs } = require('./websocket/helper');
const players_1 = require("./players");
const router = (route) => {
    const elements = route.split('/');
    return {
        "controller": elements[0],
        "action": elements[1]
    };
};
// When the client connect to the server
websocket_1.connection.on('connection', function connection(ws) {
    global.console.log('New connection:');
    // Whenever the client send a message
    ws.on('message', function incoming(message) {
        let parsed = null;
        try {
            parsed = decodeMsgFromWs(message);
            const params = router(parsed.type);
            switch (params.controller) {
                case 'player':
                    players_1.actions[params.action](parsed, ws);
                    break;
            }
            global.console.log('received:', parsed);
        }
        catch (e) {
            global.console.log('Disconnecting client');
        }
        // @todo: switch parsed.type
    });
    const data = { message: 'Hello' };
    ws.send(formatMsgForWs('hello', data));
    players_1.onInit(ws);
});
//# sourceMappingURL=index.js.map