"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const config = __importStar(require("../build.properties"));
exports.connection = new ws_1.default.Server({
    port: config.WEBSOCKET_PORT
}, () => {
    global.console.log('Server listening for WS on port ' + config.WEBSOCKET_PORT);
});
exports.CARD_PLAYED_SERVER_WS = 'card/played';
exports.ANNOUNCE_SERVER_WS = 'announce/make';
exports.PLAYER_INIT_SERVER_WS = 'player/init';
exports.PLAYER_JOIN_SERVER_WS = 'player/join';
exports.PLAYER_ACTIVE_SERVER_WS = 'player/active';
exports.GAME_START_SERVER_WS = 'game/start';
exports.CARDS_DEAL_SERVER_WS = 'cards/deal';
//# sourceMappingURL=index.js.map