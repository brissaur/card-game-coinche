"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param players
 * @param previousPlayerId
 */
exports.computeNextPlayerForTrick = (players, previousPlayerId) => {
    const previousPlayer = players.find(player => previousPlayerId === player.id);
    // if previousPlayer was the last one, take the first one
    return players.find(player => player.pos === (previousPlayer.pos + 1) % 4);
};
//# sourceMappingURL=business.js.map