"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = (table) => {
    let document = {
        currentPlayerId: table.getCurrentPlayerId(),
        firstPlayerId: table.getFirstPlayerId(),
        mode: table.getMode(),
        players: table.getPlayers().map(function (player) {
            return player.getId();
        })
    };
    return document;
};
exports.hydrate = (document, table) => {
    table.setId(document.id);
    table.setCurrentPlayerId(document.get('currentPlayerId'));
    table.setFirstPlayerId(document.get('firstPlayerId'));
    table.setMode(document.get('mode'));
    //table.setPlayers(document.get('players'));
    return table;
};
//# sourceMappingURL=tableHydrator.js.map