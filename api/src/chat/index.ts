import { formatMsgForWs } from './../websocket/helper';
import { IMessage } from '../websocket/types';
import WebSocket from 'ws';

const onMessage = async (message: IMessage, wss: WebSocket.Server) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(formatMsgForWs('chat/message', {message: message.payload.message}, {}));
        }
      });
    
};

export const chatActions = {
    message: onMessage,
};


