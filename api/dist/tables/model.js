"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeAnnounce = 'announce';
exports.modePlay = 'play';
class Table {
    constructor() {
        this.currentPlayerId = null;
        this.firstPlayerId = null;
        this.mode = null;
        this.players = [];
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setCurrentPlayerId(currentPlayerId) {
        this.currentPlayerId = currentPlayerId;
    }
    getCurrentPlayerId() {
        return this.currentPlayerId;
    }
    setFirstPlayerId(firstPlayerId) {
        this.firstPlayerId = firstPlayerId;
    }
    getFirstPlayerId() {
        return this.firstPlayerId;
    }
    setMode(mode) {
        this.mode = mode;
    }
    getMode() {
        return this.mode;
    }
    setPlayers(players) {
        this.players = players;
    }
    getPlayers() {
        return this.players;
    }
}
exports.Table = Table;
exports.createTable = () => {
    return new Table();
};
//# sourceMappingURL=model.js.map