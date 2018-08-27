/**
 *
 * @param players
 * @param previousPlayerId
 */
export const computeNextPlayerAfterTrick = (players, previousPlayerId) => {
    const previousPlayer = players.find(player => previousPlayerId === player.id);

    // if previousPlayer was the last one, take the first one
    return players.find(player => player.pos === (previousPlayer.pos + 1) % 4);
};
