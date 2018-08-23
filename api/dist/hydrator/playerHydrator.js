"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = (player) => {
    let document = {
        firstname: player.getFirstname(),
        isFakePlayer: player.getIsFakePlayer(),
    };
    return document;
};
exports.hydrate = (document, player) => {
    player.setId(document.id);
    player.setFirstname(document.get('firstname'));
    player.setIsFakePlayer(document.get('isFakePlayer'));
    return player;
};
//# sourceMappingURL=playerHydrator.js.map