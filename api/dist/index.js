"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const port = 8080;
const wss = new ws_1.default.Server({ port }, () => {
    global.console.log('Server listening for WS on port ' + port);
});
wss.on('connection', (ws) => {
    global.console.log('New connection:', ws);
    ws.on('message', (message) => {
        global.console.log('received: %s', message);
    });
    ws.send({ meta: { a: 'b' }, payload: { c: 'd', d: 'a' } });
});
//# sourceMappingURL=index.js.map