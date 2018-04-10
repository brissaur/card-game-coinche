import { computeNextPlayerForTrick } from './business';

describe('test cardsPlayed function', () => {
    [
        { currentPlayerId: 1, expectedNextPlayerId: 2 },
        { currentPlayerId: 2, expectedNextPlayerId: 3 },
        { currentPlayerId: 3, expectedNextPlayerId: 4 },
        { currentPlayerId: 4, expectedNextPlayerId: 1 },
    ].forEach((data) => {
        test('computeNextPlayerForTrick', () => {
            const players = [{ id: 1, pos: 0 }, { id: 2, pos: 1 }, { id: 3, pos: 2 }, { id: 4, pos: 3 }];

            const nextPlayer = computeNextPlayerForTrick(players, data.currentPlayerId);
            expect(nextPlayer.id).toEqual(data.expectedNextPlayerId);
        });
    });
});
