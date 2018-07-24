const WebSocket = require('ws');

const { formatMsgForWs, decodeMsgFromWs } = require('./websocket/helper');

const port = 8080;
const wss = new WebSocket.Server({ port }, () => {
	global.console.log('Server listening for WS on port ' + port);
});

wss.on('connection', function connection(ws) {
	global.console.log('New connection:');

	ws.on('message', function incoming(message) {
		let parsed = null;
		try {
			parsed = decodeMsgFromWs(message);
			global.console.log('received:', parsed);
		} catch (e) {
			global.console.log('Disconencting client');
			ws.disconnect();
		}
		// @todo: switch parsed.type
	});

	const data = { message: 'Hello' };
	ws.send(formatMsgForWs('hello', data));
});
