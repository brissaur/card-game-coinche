const WebSocket = require('ws');

const port = 8080;
const wss = new WebSocket.Server({ port }, () => {
	global.console.log('Server listening for WS on port ' + port);
});

wss.on('connection', function connection(ws) {
	global.console.log('New connection:', ws);
	ws.on('message', function incoming(message) {
		global.console.log('received: %s', message);
	});

	ws.send('something', { meta: { a: 'b' }, payload: { c: 'd' } });
});
