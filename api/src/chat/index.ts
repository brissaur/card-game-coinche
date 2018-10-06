import { formatMsgForWs } from '../websocket/helper';
import { IMessage } from '../websocket/types';
const websocket = require("ws");

const onMessage = async (message: IMessage, wss: websocket.Server) => {
    wss.clients.forEach((client: any) => {
        if (client.readyState === websocket.OPEN) {
          client.send(formatMsgForWs('chat/message', {message: message.payload.message}, {}));
        }
      });
    
};

export const chatActions = {
    message: onMessage,
};


