import ws from 'ws';

const port = 8080;
const wss = new ws.Server({ port }, () => {
	global.console.log('Server listening for WS on port ' + port);
});

wss.on('connection', (ws) => {
	global.console.log('New connection:', ws);
	ws.on('message', (message) => {
		global.console.log('received: %s', message);
	});

	ws.send({ meta: { a: 'b' }, payload: { c: 'd', d: 'a' } });
});
