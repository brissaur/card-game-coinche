import { formatMsgForWs } from '../websocket/helper';
import { IMessage } from '../websocket/types';
import ws from 'ws';

const onMessage = async (message: IMessage, wss: ws.Server) => {
    wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(formatMsgForWs('chat/message', {message: message.payload.message}, {}));
        }
      });
    
};

export const chatActions = {
    message: onMessage,
};
