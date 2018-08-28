import {IPlayer} from "../players/model";

/**
 *
 * @param players
 * @param previousPlayerId
 */
export const computeNextPlayerForTrick = (players: IPlayer[], previousPlayerId: string): IPlayer => {
    const previousPlayer = players.find(player => previousPlayerId === player.documentId);

    // if previousPlayer was the last one, take the first one
    return players.find(player => player.pos === (previousPlayer.pos + 1) % 4);
};
