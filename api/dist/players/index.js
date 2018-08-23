"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../tables/index");
const business_1 = require("./business");
const helper_1 = require("../websocket/helper");
const PlayerRepository_1 = require("../repository/PlayerRepository");
const TableRepository_1 = require("../repository/TableRepository");
const model_1 = require("./model");
const model_2 = require("../tables/model");
const COLLECTION_NAME = 'players';
const index_2 = require("../websocket/index");
/**
 *
 * @param tableId
 */
exports.getPlayersCollection = (tableId) => {
    const table = index_1.getTableById(tableId);
    return table.collection(COLLECTION_NAME);
};
/**
 *
 * @param tableId
 * @returns {Promise<Array>}
 */
exports.getPlayersOnTable = (tableId) => __awaiter(this, void 0, void 0, function* () {
    const players = [];
    const playersRef = exports.getPlayersCollection(tableId);
    yield playersRef
        .get()
        .then((snapshot) => {
        snapshot.forEach((player) => {
            players.push(player.data());
        });
    })
        .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents', err);
    });
    return players;
});
exports.onInit = (ws) => __awaiter(this, void 0, void 0, function* () {
    let player = yield PlayerRepository_1.repository.savePlayer(model_1.createPlayer());
    let table = model_2.createTable();
    table = yield TableRepository_1.repository.saveTable(table);
    ws.send(helper_1.formatMsgForWs(index_2.PLAYER_INIT_SERVER_WS, {
        playerId: player.getId(),
        playerName: player.getFirstname(),
        tableId: table.getId()
    }, {}));
    ws.send(helper_1.formatMsgForWs(index_2.PLAYER_JOIN_SERVER_WS, {
        player: {
            id: player.getId(),
            pos: player.getPos()
        },
    }, {}));
    const robot1Pr = PlayerRepository_1.repository.savePlayer(model_1.createFakePlayer(1));
    const robot2Pr = PlayerRepository_1.repository.savePlayer(model_1.createFakePlayer(2));
    const robot3Pr = PlayerRepository_1.repository.savePlayer(model_1.createFakePlayer(3));
    const [robot1, robot2, robot3] = yield Promise.all([robot1Pr, robot2Pr, robot3Pr]);
    table.setPlayers([player, robot1, robot2, robot3]);
    // table.setCurrentPlayerId(player.getId());
    // table.setFirstPlayerId(player.getId());
    // table.setMode()
    ws.send(helper_1.formatMsgForWs(index_2.PLAYER_JOIN_SERVER_WS, {
        player: {
            id: robot1.getId(),
            pos: robot1.getPos()
        },
    }, {}));
    ws.send(helper_1.formatMsgForWs(index_2.PLAYER_JOIN_SERVER_WS, {
        player: {
            id: robot2.getId(),
            pos: robot2.getPos()
        },
    }, {}));
    ws.send(helper_1.formatMsgForWs(index_2.PLAYER_JOIN_SERVER_WS, {
        player: {
            id: robot3.getId(),
            pos: robot3.getPos()
        },
    }, {}));
    if (table.getPlayers().length === 4) {
        table.setPlayers(business_1.dealCards(table.getPlayers()));
        const firstPlayerId = table.getPlayers().find(business_1.searchStartPlayer).id;
        table.setFirstPlayerId(firstPlayerId);
        table.setCurrentPlayerId(firstPlayerId);
        table.setMode(model_2.modeAnnounce);
        yield TableRepository_1.repository.saveTable(table);
        ws.send(helper_1.formatMsgForWs(index_2.GAME_START_SERVER_WS, {
            dealerId: table.getCurrentPlayerId(),
            mode: table.getMode(),
            firstPlayerId: table.getFirstPlayerId(),
            currentPlayerId: table.getCurrentPlayerId(),
        }, {}));
        ws.send(helper_1.formatMsgForWs(index_2.CARDS_DEAL_SERVER_WS, {
            cards: player.getCards().map(c => c.getId())
        }, {}));
        ws.send(helper_1.formatMsgForWs(index_2.PLAYER_ACTIVE_SERVER_WS, {
            playerId: player.getId()
        }, {}));
    }
});
exports.actions = {
    "init": exports.onInit
};
//# sourceMappingURL=index.js.map