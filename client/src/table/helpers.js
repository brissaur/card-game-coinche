// eslint-disable-next-line import/prefer-default-export
export const filterPlayer = (playerId, payload) => {
    const playerFound = payload.players.filter(player => (playerId === player.id));
    if (playerFound.length === 0) {
        throw new Error('Player\'s not found in this table');
    }

    return playerFound[0];
};
