import {IPlayer} from "../players/model";

/**
 *
 * @param players
 * @param currentPlayer
 */
export const computeNextPlayerForTrick = (players: IPlayer[], currentPlayer: IPlayer): IPlayer => {
    const previousPlayer = players.find(player => currentPlayer.getDocumentId() === player.getDocumentId());

    // if previousPlayer was the last one, take the first one
    return players.find(player => player.getPos() === (previousPlayer.getPos() + 1) % 4);
};
