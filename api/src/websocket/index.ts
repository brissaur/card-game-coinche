import WebSocket from "ws";
import * as config from "../build.properties";

import express from "express";

const PORT = +config.PORT;

const server = express()
    .use((req, res) => res.send("Hello World"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

export const connection = new WebSocket.Server(
    {
        server
    },
    () => {
        global.console.log(
            `Server listening for WS on port ${config.PORT}`
        );
    }
);

export const CARD_PLAYED_SERVER_WS = "card/played";
export const ANNOUNCE_MAKE_SERVER_WS = "announce/make";
export const ANNOUNCE_MADE_SERVER_WS = "announce/made";
export const PLAYER_INIT_SERVER_WS = "player/init";
export const PLAYER_JOIN_SERVER_WS = "player/join";
export const PLAYER_ACTIVE_SERVER_WS = "player/active";
export const GAME_START_SERVER_WS = "game/start";
export const CARDS_DEAL_SERVER_WS = "cards/deal";
export const ROUND_MODE = "round/mode";
